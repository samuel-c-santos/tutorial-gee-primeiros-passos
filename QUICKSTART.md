# 🚀 Guia Rápido - Google Earth Engine

> Resumo executivo para começar no GEE em minutos

## ⚡ Início Rápido (5 minutos)

### 1. Registrar Conta

```
1. Acesse: https://code.earthengine.google.com/
2. Clique: "I WANT TO REGISTER A NEW PROJECT"
3. Escolha: Uso NÃO COMERCIAL
4. Preencha: Nome do projeto + dados institucionais
5. Aguarde: Aprovação (geralmente instantânea)
6. Ative: API do Earth Engine
```

### 2. Fazer Upload de Shapefile

```
1. Assets > NEW > Shapefile
2. SELECT > Escolha TODOS os arquivos (.shp, .shx, .dbf, .prj)
3. Defina um Asset ID (ex: meu-municipio)
4. UPLOAD
5. Aguarde processamento na aba Tasks
```

### 3. Visualizar no Mapa

Cole este código no editor e clique **RUN**:

```javascript
// Substitua pelo seu Asset ID
var area = ee.FeatureCollection("projects/SEU-PROJETO/assets/SEU-ASSET");

// Centralizar e visualizar
Map.centerObject(area, 8);
Map.addLayer(area, {color: 'blue'}, 'Minha Área');
```

## 📋 Checklist de Configuração

- [ ] Conta Google criada
- [ ] Projeto GEE registrado
- [ ] API do Earth Engine ativada
- [ ] Shapefile pronto (todos os arquivos)
- [ ] Asset ID copiado
- [ ] Primeiro script executado com sucesso

## 🎯 Comandos Essenciais

### Carregar Imagem de Satélite

```javascript
// Landsat 8 - última imagem disponível
var imagem = ee.Image('LANDSAT/LC08/C02/T1_TOA/LC08_225063_20230101');
Map.addLayer(imagem, {bands: ['B4', 'B3', 'B2'], max: 0.3}, 'RGB Natural');
```

### Filtrar por Data e Região

```javascript
// Sentinel-2 no último ano
var colecao = ee.ImageCollection('COPERNICUS/S2_SR')
  .filterBounds(area)
  .filterDate('2023-01-01', '2023-12-31')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20));

print('Número de imagens:', colecao.size());
```

### Calcular NDVI

```javascript
var calcularNDVI = function(imagem) {
  return imagem.normalizedDifference(['B8', 'B4']).rename('NDVI');
};

var ndvi = calcularNDVI(imagem);
Map.addLayer(ndvi, {min: 0, max: 1, palette: ['red', 'yellow', 'green']}, 'NDVI');
```

### Exportar para Google Drive

```javascript
Export.image.toDrive({
  image: ndvi,
  description: 'NDVI_2023',
  scale: 30,
  region: area,
  maxPixels: 1e13
});
// Depois clique em RUN na aba Tasks
```

## 🔧 Solução de Problemas Comuns

### "Não consigo registrar projeto"
✅ **Solução:** Certifique-se de estar usando credenciais acadêmicas/institucionais válidas

### "Asset não aparece após upload"
✅ **Solução:** Clique no botão de atualizar na aba Assets e aguarde o processamento em Tasks

### "Erro ao executar script"
✅ **Solução:** Verifique se o Asset ID está correto (cole o ID completo copiado dos detalhes do asset)

### "Memory limit exceeded"
✅ **Solução:** Reduza a área de análise ou aumente o parâmetro `scale` nas exportações

## 📚 Estrutura Básica de um Script

```javascript
// 1. DEFINIR ÁREA DE INTERESSE
var aoi = ee.FeatureCollection("projects/.../assets/minha-area");

// 2. CARREGAR DADOS
var colecao = ee.ImageCollection('COPERNICUS/S2_SR')
  .filterBounds(aoi)
  .filterDate('2023-06-01', '2023-08-31');

// 3. PROCESSAR
var mediana = colecao.median().clip(aoi);

// 4. VISUALIZAR
Map.centerObject(aoi, 10);
Map.addLayer(mediana, {bands: ['B4','B3','B2'], max: 3000}, 'RGB');

// 5. EXPORTAR (opcional)
Export.image.toDrive({
  image: mediana,
  description: 'composicao_verao_2023',
  scale: 10,
  region: aoi
});
```

## 🎓 Recursos de Aprendizagem

### Documentação Oficial
- [Guia do Iniciante](https://developers.google.com/earth-engine/guides/getstarted)
- [Catálogo de Dados](https://developers.google.com/earth-engine/datasets)
- [Referência da API](https://developers.google.com/earth-engine/apidocs)

### Exemplos Práticos
- [Scripts de Exemplo](https://code.earthengine.google.com/?accept_repo=users/google/datasets)
- [Vídeos Tutoriais](https://www.youtube.com/c/GoogleEarthEngine)

### Comunidade
- [Fórum Google Earth Engine](https://groups.google.com/g/google-earth-engine-developers)
- [GEE no Stack Overflow](https://stackoverflow.com/questions/tagged/google-earth-engine)

## 🗺️ Catálogos Mais Usados

| Dataset | Descrição | ID |
|---------|-----------|-----|
| **Landsat 8** | Imagens multiespectrais 30m | `LANDSAT/LC08/C02/T1_L2` |
| **Sentinel-2** | Imagens multiespectrais 10m | `COPERNICUS/S2_SR` |
| **MODIS NDVI** | Índice de vegetação 250m | `MODIS/006/MOD13Q1` |
| **SRTM** | Modelo de elevação 30m | `USGS/SRTMGL1_003` |
| **MapBiomas** | Cobertura do solo Brasil | `projects/mapbiomas-workspace/public/collection7/mapbiomas_collection70_integration_v2` |

## 💡 Dicas de Produtividade

1. **Use Ctrl + Enter** para executar scripts rapidamente
2. **Salve scripts frequentemente** no seu repositório pessoal
3. **Use `print()` generosamente** para debugar variáveis
4. **Documente seu código** com comentários (`//`)
5. **Crie funções reutilizáveis** para análises repetitivas
6. **Use variáveis com nomes descritivos** (`roi`, `aoi`, `area`)

## 🎯 Próximos Objetivos

Após dominar o básico, experimente:

- [ ] Criar uma série temporal de NDVI
- [ ] Detectar mudanças de cobertura do solo
- [ ] Calcular estatísticas por município
- [ ] Criar um aplicativo interativo (Apps)
- [ ] Integrar GEE com Python (`earthengine-api`)
- [ ] Processar dados de radar (Sentinel-1)
- [ ] Publicar um mapa temático

## 📞 Precisa de Ajuda?

- 📖 Consulte o [Tutorial Completo](index.html)
- 📧 Entre em contato: samuelsantosambiental@gmail.com
- 🐙 Veja exemplos no [GitHub](https://github.com/samuel-c-santos)

---

**Tempo estimado para setup completo:** 10-15 minutos

**Boa sorte com suas análises geoespaciais!** 🌍✨
