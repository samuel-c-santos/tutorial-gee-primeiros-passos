# Guia Rápido - Google Earth Engine

> Comandos e funções essenciais para análise geoespacial

## Configuração Inicial

Para o passo a passo completo de configuração, consulte o [tutorial](https://samuel-c-santos.github.io/tutorial-gee-primeiros-passos).

## Comandos Essenciais

### Manipulação de Imagens

```javascript
// Carregar imagem específica
var imagem = ee.Image('LANDSAT/LC08/C02/T1_TOA/LC08_225063_20230101');

// Clipar para área de interesse
var imagem_clipada = imagem.clip(area);

// Calcular estatísticas
var stats = imagem.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: area,
  scale: 30,
  maxPixels: 1e13
});
```

### Análise de Coleções

```javascript
// Filtrar coleção por múltiplos critérios
var colecao = ee.ImageCollection('COPERNICUS/S2_SR')
  .filterBounds(area)
  .filterDate('2023-01-01', '2023-12-31')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
  .filterMetadata('MGRS_TILE', 'equals', '21LXS');

// Mediana da coleção
var mediana = colecao.median();

// Primeira e última imagem
var primeira = colecao.first();
var ultima = colecao.sort('system:time_start').limit(1);
```

### Índices Espectrais

```javascript
// NDVI (Sentinel-2)
var ndvi = imagem.normalizedDifference(['B8', 'B4']).rename('NDVI');

// NDWI
var ndwi = imagem.normalizedDifference(['B3', 'B8']).rename('NDWI');

// EVI
var evi = imagem.expression(
  '2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))', {
    'NIR': imagem.select('B8'),
    'RED': imagem.select('B4'),
    'BLUE': imagem.select('B2')
});

// Múltiplos índices em uma imagem
var indices = imagem.addBands(ndvi).addBands(ndwi).addBands(evi);
```

### Classificação e Máscaras

```javascript
// Máscara de nuvens (Sentinel-2)
var mascara_nuvens = function(imagem) {
  var qa = imagem.select('QA60');
  var nuvemBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mascara = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return imagem.updateMask(mascara);
};

// Classificação simples baseada em NDVI
var classes = ndvi.gt(0.3).where(
  ndvi.gt(0.6), 2
).where(
  ndvi.lte(0.3), 0
).rename('cobertura_vegetal');
```

### Operações Vetoriais

```javascript
// Buffer em geometria
var buffer = area.geometry().buffer(1000);

// Intersecção e união
var interseccao = area.intersection(outra_area);
var uniao = area.union(outra_area);

// Calcular área
var area_km2 = area.geometry().area().divide(1000000);

// Zonal statistics
var zonal_stats = ndvi.reduceRegions({
  collection: area,
  reducer: ee.Reducer.mean().combine({
    reducer2: ee.Reducer.stdDev(),
    sharedInputs: true
  }),
  scale: 10
});
```

### Exportação Avançada

```javascript
// Exportar tabela de resultados
Export.table.toDrive({
  collection: zonal_stats,
  description: 'estatisticas_ndvi',
  fileFormat: 'CSV'
});

// Exportar imagem com parametros específicos
Export.image.toAsset({
  image: ndvi,
  description: 'ndvi_asset',
  assetId: 'projects/SEU-PROJETO/assets/ndvi_resultado',
  scale: 10,
  region: area,
  maxPixels: 1e13
});

// Exportar múltiplas imagens em lote
var imagens_para_exportar = colecao.toList(colecao.size());
for (var i = 0; i < colecao.size().getInfo(); i++) {
  var img = ee.Image(imagens_para_exportar.get(i));
  var data = img.date().format('YYYY-MM-dd').getInfo();
  Export.image.toDrive({
    image: img.select('B4','B3','B2'),
    description: 'RGB_' + data,
    scale: 10,
    region: area
  });
}
```

### Séries Temporais

```javascript
// Criar série temporal de NDVI
var serie_ndvi = ee.ImageCollection('COPERNICUS/S2_SR')
  .filterBounds(area)
  .filterDate('2020-01-01', '2023-12-31')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
  .map(function(imagem) {
    return imagem.addBands(
      imagem.normalizedDifference(['B8', 'B4']).rename('NDVI')
    );
  });

// Gráfico de série temporal
var grafico = ui.Chart.image.series(serie_ndvi.select('NDVI'), area, ee.Reducer.mean(), 500)
  .setOptions({
    title: 'Série Temporal NDVI',
    vAxis: {title: 'NDVI'},
    hAxis: {title: 'Data'},
    lineWidth: 1,
    pointSize: 3
  });

print(grafico);
```

## Catálogos de Dados Principais

| Dataset | Resolução | Período | ID |
|---------|-----------|---------|-----|
| Landsat 8/9 | 30m | 2013-presente | `LANDSAT/LC08/C02/T1_L2` |
| Sentinel-2 | 10-60m | 2015-presente | `COPERNICUS/S2_SR` |
| MODIS NDVI | 250m | 2000-presente | `MODIS/006/MOD13Q1` |
| SRTM | 30m | - | `USGS/SRTMGL1_003` |
| CHIRPS Precipitação | 5km | 1981-presente | `UCSB-CHG/CHIRPS/DAILY` |
| MapBiomas | 30m | 1985-2022 | `projects/mapbiomas-workspace/public/collection7` |

## Operadores e Funções Úteis

### Operadores Lógicos
```javascript
// Operadores de comparação
.eq()    // igual
.neq()   // diferente
.lt()    // menor que
.lte()   // menor ou igual
.gt()    // maior que
.gte()   // maior ou igual

// Operadores lógicos
.and()   // e
.or()    // ou
.not()   // não
```

### Redutores Estatísticos
```javascript
var media = colecao.mean();
var mediana = colecao.median();
var minimo = colecao.min();
var maximo = colecao.max();
var desvio_padrao = colecao.stdDev();

// Redutor personalizado
var custom_stats = colecao.reduce(ee.Reducer.mean()
  .combine({
    reducer2: ee.Reducer.minMax(),
    sharedInputs: true
  })
  .combine({
    reducer3: ee.Reducer.percentile([25, 75]),
    sharedInputs: true
  })
);
```

### Funções de Data
```javascript
// Formatar data
var data_formatada = ee.Date('2023-01-15').format('YYYY-MM-dd');

// Calcular dias desde início do ano
var dia_do_ano = ee.Date('2023-06-15').getRelative('day', 'year');

// Avançar/retroceder tempo
var data_futura = ee.Date('2023-01-01').advance(30, 'day');
var data_passada = ee.Date('2023-01-01').advance(-1, 'month');
```

## Depuração e Validação

### Verificar Propriedades
```javascript
// Informações da imagem
print('Bandas:', imagem.bandNames());
print('Propriedades:', imagem.propertyNames());
print('Data:', imagem.date());
print('Tipo de dados:', image.bandTypes());

// Informações da coleção
print('Número de imagens:', colecao.size());
print('Período:', colecao.aggregate_min('system:time_start'), 
      colecao.aggregate_max('system:time_start'));
```

### Validação de Dados
```javascript
// Verificar máscara
var mascara_valida = imagem.mask().select(0);

// Contar pixels válidos
var pixels_validos = mascara_valida.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: area,
  scale: 30
});

// Verificar valores mínimos e máximos
var stats = imagem.reduceRegion({
  reducer: ee.Reducer.minMax(),
  geometry: area,
  scale: 30
});
```

## Boas Práticas

1. **Sempre use clips** para delimitar área de análise
2. **Verifique máscaras de nuvens** antes de processar
3. **Use escalas apropriadas** para cada tipo de análise
4. **Monitore uso de memória** com `maxPixels`
5. **Documente parâmetros importantes** em comentários
6. **Teste com áreas pequenas** antes de processar grandes regiões

## Referências Rápidas

- **Documentação:** https://developers.google.com/earth-engine
- **Catálogo de Dados:** https://developers.google.com/earth-engine/datasets
- **Exemplos:** https://code.earthengine.google.com/
