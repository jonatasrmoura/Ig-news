# Ig.News

<h4>Aplicação de assinatura de conteúdo falando sobre tecnologia, utilizando conta do Github para o login</h4>

<h5>Fundamentos do Next.js</h5>
<span>Principais anotações</span>

<p>Next.js é um framework criado em cima da biblioteca React e que é usado com o próprio React.</p>

<h3>Conceitos SSR(Server-side Rendering)</h3>

<p>
Quando um Browser(Cliente) acessa nosso servidor, o Browser vai acessar a camada do Next.js que é um servidor Node.js. O Node.js é a principal forma hoje de interpretar códigos JavaScript pelo lado do Back-end(Servidor), o React é código JavaScript, ou sejá, se o Node.js consegue entender JavaScript e o código do React é JavaScript, então o que vai acontecer é...

Browser(Cliente) acessa -> Next.js(Servidor Node.js) acessa -> Código React(bundle.js[todas as informações]) fazer chamadas APIs -> Back-end(Servidor) ex: traser uma listagem de produtos

Back-end(Servidor) retorna a lista de produtos em JSON -> Código React(bundle.js) vai interpretar o que está chegando do Back-end -> Interface(Tag HTML que vai ser gerado para exibir lista) returna para -> Next.js(Servidor Node.js) devolve a interface -> Browser(Cliente)
</p>


<h3>3 Formas principais de fazer uma chamada a api</h3>
<p>- <strong>Client-side </strong>Quando não precisa de indexação, informação que é carregada de uma ação do usuário, não
  necessáriamente quando a página carrega, DEPOIS DA PÁGINA SER CARREGADA.</p>
<p>- <strong>Server-side </strong>Dados dinâmicos(tempo real) do usuário que está acessando (no contexto da requisição)</p>
<p>- <strong>Static Site Generation </strong>Bom para CO, página para todo mundo ver</p>

<hr>

<h2>Autenticação com Next.js</h2>


<h4>Métodos disponíveis dentro do Next.js para se autenticar</h4>
<p>JWT (Storage)</p>
<p>Next Auth (Social)</p>
<p>Cognito, Auth0</p>
