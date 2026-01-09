# Primeiros Passos no Google Earth Engine

Tutorial interativo e completo para iniciar no Google Earth Engine (GEE), desde o registro até a primeira visualização de dados geoespaciais.

**Acesse o tutorial:** [clique aqui](https://samuel-c-santos.github.io/tutorial-gee-primeiros-passos)

## Sobre o Projeto

Este é um projeto educacional com o objetivo de democratizar o acesso ao conhecimento sobre ferramentas de sensoriamento remoto e análise geoespacial. O Google Earth Engine é uma plataforma poderosa que pode transformar a forma como pesquisadores, estudantes e profissionais trabalham com dados ambientais, mas sua configuração inicial pode ser desafiadora para iniciantes.

Este tutorial foi criado para guiar você passo a passo através de todo o processo de configuração, desde o registro da conta até a execução do seu primeiro script de visualização.

## Conteúdo do Tutorial

O tutorial abrange:

- **Registro e configuração:** Como criar uma conta não comercial, configurar projeto no Google Cloud e ativar APIs necessárias
- **Upload de dados:** Processo completo de importação de shapefiles como assets no GEE
- **Primeiro script:** Introdução ao Code Editor e execução de um script JavaScript para visualizar geometrias
- **Explicações práticas:** Cada passo documentado com capturas de tela e instruções detalhadas

Confira o resumo executivo para começar no GEE em minutos [QUICKSTART.md](QUICKSTART.md).

## Estrutura do Repositório

```
tutorial-configuração-gee/
├── index.html              # Página principal do tutorial
├── README.md               # Este arquivo
├── QUICKSTART.md           # Referência rápida de comandos GEE
├── img/                    # Capturas de tela do processo
│   ├── 1.entre_no_code_editor.png
│   ├── 2.criar_um_projeto.png
│   └── ...
└── dados/
    └── script-gee.js       # Script JavaScript de exemplo
```

### Script de Exemplo

O arquivo [`dados/script-gee.js`](dados/script-gee.js) contém o código JavaScript completo usado no tutorial, demonstrando:
- Carregamento de FeatureCollections (assets vetoriais)
- Centralização do mapa em uma área de interesse
- Duas técnicas de visualização: preenchimento sólido e contorno

## Tecnologias Utilizadas

- **HTML/CSS:** Estrutura e design responsivo
- **Prism.js:** Syntax highlighting para blocos de código JavaScript
- **Google Fonts (Inter):** Tipografia moderna
- **JavaScript:** Code Editor do Google Earth Engine

## Licença

Este projeto educacional está disponível para uso livre. Sinta-se à vontade para compartilhar, adaptar e utilizar em contextos educacionais.

---

**Desenvolvido por:** [Samuel Santos](https://samuel-c-santos.github.io/)
