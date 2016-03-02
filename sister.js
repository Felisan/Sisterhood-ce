
var titulo;
var texto;
var infoUrl;
var sister;
var searchTerm;
var filelist;
var crazyNum;
var rawFileName;
var encodedFileName;

function pickSister(){
 
  sister= feminists[Math.floor(Math.random()*feminists.length)];
  searchTerm=sister;

}

pickSister();


//This request gets the wikipedia entry. returns an json. and inserts it into the DOM
$.ajax( {
    url: "https://en.wikipedia.org/w/api.php?",
    data: "action=opensearch&search="+sister+"&limit=1",
    dataType: "json",
    type: "POST",
    headers: { "Api-User-Agent": "My cool chrome extension. find me at felisan@gmail.com" },
    success: function(data) {
       	info= data;
       	titulo= info[0];
       	texto= info[2][0];

       	console.log(data);
       	document.getElementById("title").innerHTML = titulo;
       	document.getElementById("text").innerHTML = texto;
    }
} );
//This request gets file name of images
//https://en.wikipedia.org/w/api.php?action=query&format=json&prop=images&titles=Marie+Curie&imlimit=1&callback=?

$.ajax( {
    url: "https://en.wikipedia.org/w/api.php?",
    data: "action=query&format=json&prop=pageimages&titles="+searchTerm+"&piprop=name",
    dataType: "json",
    type: "POST",
    headers: { "Api-User-Agent": "My cool chrome extension. find me at felisan@gmail.com" },
    success: function(data) {
       	filelist=data;
       	console.log(filelist);
       	crazyNum= Object.keys(filelist.query.pages);
       	console.log(crazyNum);
       	rawFileName=filelist.query.pages[crazyNum].pageimage;
        encodedFileName= rawFileName.replace(/_/g, "+");
        $.ajax( { //This request takes the encoded file name, brings back the url of the file, and inserts it into the DOM
    url: "https://en.wikipedia.org/w/api.php?",
    data: "action=query&format=json&prop=imageinfo&titles=File%3A"+encodedFileName+"&iiprop=url",
    dataType: "json",
    type: "POST",
    headers: { "Api-User-Agent": "My cool chrome extension. find me at felisan@gmail.com" },
    success: function(data) {
      infoUrl= data;
      crazyNum2=Object.keys(infoUrl.query.pages);
        Imageurl= infoUrl.query.pages[crazyNum2].imageinfo[0].url;
        console.log(Imageurl);
        document.getElementById("imagen").setAttribute("src", Imageurl) = titulo;
        
    }
} );
    }
} );
 
//https://en.wikipedia.org/w/api.php?action=query&format=json&prop=imageinfo&titles=File%3AMarstonpetermayergaines.jpg&iiprop=url&iiurlwidth=175&callback=?
//action=query&format=json&prop=imageinfo&titles=File%3AFrida+Kahlo,+by+Guillermo+Kahlo.jpg&iiprop=url&iiurlwidth=175&callback=?
//action=query&format=json&prop=pageimages&titles=Frida+Kahlo&piprop=name
//Imageurl= infoUrl.query.pages[-1].imageinfo[0].url;




