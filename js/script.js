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

  /* [DONE] add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');
  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
};





const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

const generateTitleLinks = function () {
  const clickedElement = this;
  console.log('function generateTitleLinks executed');
  console.log(clickedElement);
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  console.log(titleList);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  let html = '';

  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */


    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /* insert link into titleList */
    html = html + linkHTML;

  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

};

const tags = document.querySelectorAll('.tags a');
for(let tag of tags){
  tag.addEventListener('click', generateTitleLinks);
}

const authors = document.querySelectorAll('.authors a');
for(let author of authors){
  author.addEventListener('click', generateTitleLinks);
}

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagsList = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = ' ';
    /* get tags from data-tags attribute */
    const dataTags = article.getAttribute('data-tags');
    console.log(dataTags);
    /* split tags into array */
    const dataTagsArray = dataTags.split(' ');
    console.log(dataTagsArray);
    /* START LOOP: for each tag */
    for (let tag of dataTagsArray) {
      /* generate HTML of the link */
      html = html + '<li><a href="#">'+tag+'</a></li>';
      console.log(html);
      /* add generated code to html variable */

    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    article.innerHTML = html;
  /* END LOOP: for every article: */
  }
}

generateTags();
