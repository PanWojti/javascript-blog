//document.getElementById('test-button').addEventListener('click', function(){
//  const links = document.querySelectorAll('.titles a');
//  console.log('links:', links);
//});
const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [IN PROGRESS] add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');
  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
  activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute("href");

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }



  const generateTitleLinks = function (event) {
    console.log("function generateTitleLinks executed");

  /* [DONE] Remove links in left column*/
  const clearTitles = function (){
	  document.querySelector(".titles").innerHTML = '';
    console.log("clearTitles executed");
  }
  clearTitles();

  /* Read every post id and save it to constant*/
  const posts = document.querySelectorAll(".posts .post");
  console.log("posts Id loaded");
  console.log(posts);

  let postsId = [];
  for (let post of posts) {
    postsId.push(post.getAttribute("id"));
  }
  console.log(postsId);
  /* Find element with title and save title to constant*/
  const titles = document.querySelectorAll(".posts .post-title");
  console.log("posts title loaded");
  console.log(titles);

  let titlesHtml = [];
  for (let title of titles) {
    titlesHtml.push(title.innerHTML);
  }
  console.log(titlesHtml);

  /* create link html code and save it to constant*/


  /* put created link html code to column on the left*/



}

const tags = document.querySelectorAll('.tags a');
for(let tag of tags){
  tag.addEventListener('click', generateTitleLinks);
}

const authors = document.querySelectorAll('.authors a');
for(let author of authors){
  author.addEventListener('click', generateTitleLinks);
}
