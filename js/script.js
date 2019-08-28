//document.getElementById('test-button').addEventListener('click', function(){
//  const links = document.querySelectorAll('.titles a');
//  console.log('links:', links);
//});

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-cloud-link').innerHTML),
  authorsListLink: Handlebars.compile(document.querySelector('#template-authorsList-link').innerHTML)
}

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

const opt = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  articleTagsSelector: '.post-tags .list',
  articleAuthorSelector: '.post-author',
  tagsListSelector: '.tags.list',
  cloudClassCount: 5,
  cloudClassPrefix: 'tag-size-',
  authorsListSelector: '.authors.list'
};


function generateTitleLinks(customSelector = '') {
  const clickedElement = this;
  /* remove contents of titleList */
  const titleList = document.querySelector(opt.titleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(opt.articleSelector + customSelector);

  let html = '';

  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    const articleTitle = article.querySelector(opt.titleSelector).innerHTML;

    /* get the title from the title element */


    /* create HTML of the link */
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

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

/* FUNCTION to check and return highest and lowest value of tag count to calculate proper tag classes */

function calculateTagsParams(tags){
  /* Create object that will contain min and max value of tags occurence */
  let params = {
    min: 999999,
    max: 0
  }
  /* Start loop: for each tag in tags: */
  for(let tag in tags){
    /* max value of params take the higher value from pair current params.max and current tag being checked: */
    params.max = Math.max(tags[tag], params.max);
    /* min value of params take the lower value from pair current params.min and current tag being checked: */
    params.min = Math.min(tags[tag], params.min);
  }
  return params;
}

/* FUNCTION that calculates tag class number based on min and max tag count (params) and current tag count */

function calculateTagClass(count, params){

  /* calculate difference between current tag count and min tag count */
  const normalizedCount = count - params.min;
  /* calculate range between max tag count and min tag count */
  const normalizedMax = params.max - params.min;
  /* calculate what percentage of the range is the distance from min tag count to current tag count */
  const percentage = normalizedCount / normalizedMax;
  /* calculate class number of current tag */
  const classNumber = Math.floor( percentage * (opt.cloudClassCount - 1) + 1 );
  /* make html code by adding prefix to class number */
  const classNumberHTML = opt.cloudClassPrefix + classNumber;
  /* return class number of current tag */
  return classNumberHTML;
}

/* FUNCTION to generate tags links under articles and tags links in right column */

function generateTags(){
  /* create a new variable allTags with an empty object, that will store tags and their counts */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(opt.articleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper in each article*/
    const tagsList = article.querySelector(opt.articleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute of each article*/
    const dataTags = article.getAttribute('data-tags');
    /* split tags into array */
    const dataTagsArray = dataTags.split(' ');
    /* START LOOP: for each tag */
    for (let tag of dataTagsArray) {
      /* generate HTML of the link */
      /*const linkHTML = '<li><a href="#tag-' + tag + '">'+tag+'</a></li><span> </span>';*/
      const linkHTMLData = {tag: tag};
      const linkHTML = templates.tagLink(linkHTMLData);
      /* add generated code to html variable */
      html = html + linkHTML;
      /* Check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* Add tag to allTags object */
        allTags[tag] = 1;
      }
        /* Else increase its value */
      else {
        allTags[tag]++;
      }
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper of each article*/
    tagsList.innerHTML = html;
  /* END LOOP: for every article: */
  }
  /* Find list of tags in right column */
  const tagList = document.querySelector(opt.tagsListSelector);

  /* Create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  const allTagsData = {tags: []};
  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML: */
    /*allTagsHTML += '<li><a href="#" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + ' <a></li><span> </span>';*/
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }
  /* End LOOP: for each tag in allTags: */

  /* Add html from allTagsHTML to tagList: */
  /*tagList.innerHTML = allTagsHTML;*/
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log(allTagsData);
}

generateTags();

/* FUNCTION to generate authors links in  articles and authors links in right column */

function generateAuthors(){
  /* create a new variable allAuthors with an empty object */
  let allAuthors = {};
  /* find all articles */
  const articles = document.querySelectorAll(opt.articleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const authorsList = article.querySelector(opt.articleAuthorSelector);
    /* make html variable with empty string */
    let html = '';
    /* make htmlRight variable with empty string */
    let htmlRight = '';
    /* get tags from data-tags attribute */
    const dataAuthors = article.getAttribute('data-author');
    /* generate HTML of the link to be put in the article*/
    /*const linkHTML = '<span>by </span>' + '<a href="#author-' + dataAuthors + '">' + dataAuthors + '</a>';*/
    const linkHTMLData = {id: dataAuthors};
    const linkHTML = templates.authorLink(linkHTMLData);
    /* generate HTML of the link to be put in the right column*/
    const linkHTMLRight = '<a href="#author-' + dataAuthors + '">' + dataAuthors + '</a><br>';
    /* add generated code to html variable */
    html = html + linkHTML;

    htmlRight = htmlRight + linkHTMLRight;
    /* insert HTML of all the links into the authors wrapper */
    authorsList.innerHTML = html;
    /* check if author of current article is already an element of allAuthors object */
    if(!allAuthors.hasOwnProperty(dataAuthors)) {
        /* [NEW] add generated code to allAuthors object */
        allAuthors[dataAuthors] = 1;
      } else {
        allAuthors[dataAuthors]++;
      }
  /* END LOOP: for every article: */
  }
  /* find right column authors list wrapper and create constant authorsLinksList  */
  const authorsLinksList = document.querySelector(opt.authorsListSelector);
  /* create allAuthorsHTML as an empty string  */
  let allAuthorsHTML = '';
  /* START LOOP: for every author: */
  for(let author in allAuthors){
    /* generate code of a link and add it to allAuthorsHTML: */
    allAuthorsHTML += '<li><a href="#">' + author + ' (' + allAuthors[author] + ')<a></li>';
  }
  /* add html code from allAuthorsHTML to the right column: */
  authorsLinksList.innerHTML = allAuthorsHTML;
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
