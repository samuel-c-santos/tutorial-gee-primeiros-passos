// 1. Carregar o asset
// Definimos o caminho do seu polígono
var roi = ee.FeatureCollection("projects/analise-simplificada/assets/estado-do-para");

// 2. Centralizar a visualização
// O comando foca o mapa no seu polígono com um zoom automático
Map.centerObject(roi, 6);

// 3. Opção A: Visualização Simples (Preenchida)
// Exibe o polígono com uma cor sólida
Map.addLayer(roi, { color: 'blue' }, 'Estado do Pará (Preenchido)');

// 4. Opção B: Visualização de Contorno (Mais recomendada)
// Cria um estilo apenas com a borda vermelha e fundo transparente
var empty = ee.Image().byte();
var outline = empty.paint({
    featureCollection: roi,
    color: 1,
    width: 2
});

Map.addLayer(outline, { palette: 'red' }, 'Estado do Pará (Contorno)');