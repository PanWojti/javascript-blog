//document.getElementById('test-button').addEventListener('click', function(){
//  const links = document.querySelectorAll('.titles a');
//  console.log('links:', links);
//});
const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
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

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
};





const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list';

function generateTitleLinks(customSelector = '') {
  const clickedElement = this;
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */


    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

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
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagsList = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const dataTags = article.getAttribute('data-tags');
    /* split tags into array */
    const dataTagsArray = dataTags.split(' ');
    /* START LOOP: for each tag */
    for (let tag of dataTagsArray) {
      /* generate HTML of the link */
      linkHTML = '<li><a href="#tag-' + tag + '">'+tag+'</a></li><span> </span>';
      /* add generated code to html variable */
      html = html + linkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsList.innerHTML = html;
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML: */
    allTagsHTML += '<li><a href="#">' + tag + ' (' + allTags[tag] + ') </li><a>';
  }
  /* [NEW] End LOOP: for each tag in allTags: */

  /* [NEW] add html from allTagsHTML to tagList: */
  tagList.innerHTML = allTagsHTML;
}

generateTags();

function generateAuthors(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const authorsList = article.querySelector(optArticleAuthorSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const dataAuthors = article.getAttribute('data-author');
    /* START LOOP: for each tag */
    /*for (let tag of dataTagsArray) {
      /* generate HTML of the link */
    html = html + '<span>by </span>' + '<a href="#author-' + dataAuthors + '">' + dataAuthors + '</a>';
      /* add generated code to html variable */

    /* END LOOP: for each tag */
    /*}
    /* insert HTML of all the links into the tags wrapper */
    authorsList.innerHTML = html;
  /* END LOOP: for every article: */
  }
}

generateAuthors();

const tagClickHandler = function(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('ClickedElement: ' + clickedElement);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);
  /* find all tag links with class active */
  const tagsLinksActive = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(tagsLinksActive);
  /* START LOOP: for each active tag link */
  for (let tagLinkActive of tagsLinksActive) {
    /* remove class active */
    tagLinkActive.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const clickedTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(clickedTagLinks);
  /* START LOOP: for each found tag link */
  for (let clickedTagLink of clickedTagLinks) {
    /* add class active */
    clickedTagLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}


const authorClickHandler = function(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('ClickedElement: ' + clickedElement);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('href: ' + href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');
  console.log('Author: ' + author);
  /* find all tag links with class active */
  const authorsLinksActive = document.querySelectorAll('a.active[href^="#author-"]');
  console.log(authorsLinksActive);
  /* START LOOP: for each active tag link */
  for (let authorLinkActive of authorsLinksActive) {
    /* remove class active */
    authorLinkActive.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const clickedAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('clickedAuthorlinks: ' + clickedAuthorLinks);
  /* START LOOP: for each found tag link */
  for (let clickedAuthorLink of clickedAuthorLinks) {
    /* add class active */
    clickedAuthorLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}





function addClickListenersToTags(){
  /* find all links to tags */
  const postTags = document.querySelectorAll('.post-tags a');
  /* START LOOP: for each link */
  for(let tag of postTags){
    /* add tagClickHandler as event listener for that link */
    tag.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}
addClickListenersToTags();

function addClickListenersToAuthors(){
  /* find all links to tags */
  const postAuthors = document.querySelectorAll('.post-author a');
  /* START LOOP: for each link */
  for(let author of postAuthors){
    author.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();
