// const { Console } = require("console");


const output = document.querySelector('.IndexResult');
const OutputById = document.querySelector('.SingleProduct');
OutputCompare = document.querySelector('.compare');
const pagination = document.querySelector('.pagination');
const TotalRow = document.querySelector('.Total');
const Searchvalue = document.querySelector('.SearchKeyword');
const SearchButton = document.querySelector('.SearchButton');
const API = 'http://localhost:8090/api/';


window.onload = function () {
    init();
    AllResultCount();
};
// onload data
function init() {
    const URL_cars = API + "cars/20/0"
    console.log(URL_cars);
    fetch(URL_cars)
        .then((rep) => rep.json())
        .then((data) => {
            console.log(data);
            for (var i = 0; i < data.length; i = i + 1) {
                (function (i) {

                    setTimeout(function (i) {
                        if (data.length > 0) {
                            output.innerHTML = ""

                            data.forEach(element => {
                                var imageurl = element["CarImage"];
                                imageurl = imageurl.split(' ')[0];
                                let Html_Result = ` 
                                <div class="col-md-3 col-sm-6" data-toggle="modal" data-target="#modal-fullscreen-xl"  
                                onClick="SelectedCar(${element["id"]})">
                            <div class="vehicle-content theme-yellow">
                                <div class="vehicle-thumbnail">
                                    <a href="#">
                                        <img src="${imageurl}" alt="${element["name"]}" />
                                    </a>
                                </div>
                                <div class="vehicle-bottom-content">
                                    <span class=""><a href="#">${element["name"]}</a></span>
                                    
                                </div>
                            </div>
                        </div>`;
                                output.innerHTML += Html_Result;
                            });
                        }
                    }, 0)
                })(i)
            }


        })
        .catch((error) => {
            console.log('Fetch problem : ' + error.message);
            alert("Error, Check Api connection / internet connection")
        })

}
// onload pagination
function AllResultCount() {
    const TotalCars = API + "total/"
    const initAPI = API + "cars/";
    fetch(TotalCars)
        .then((rep) => rep.json())
        .then((data) => {
            ResultsCount(initAPI, data[0].total);
        })
        .catch((error) => {
            console.log('Fetch problem : ' + error.message);
        })
}

// Total number of data
function ResultsCount(API, Data) {

    // console.log(Data);

    if (Data > 0) {
        let total = `
        <h6><u>${Data} Results Found.</u></h6>
    `;
        TotalRow.innerHTML = total;
        //    pagenation 
        let stop = Data / 20;
        let reminder = Data % 20;
        var i = 1;
        var limit = 20;
        var offset = 0;


        for (i; i < stop + 1; i++) {
            // console.log(stop);
            // only loop when the offset is lesser than the total number of data/result count
            if (offset < Data) {

                var list = document.createElement("li");
                var link = document.createElement("a");
                link.setAttribute("href", "#");

                list.setAttribute('class', "badge status-primary pd-right-5 mt-right-5");
                list.setAttribute('onclick', 'javascript: PageNumbers("' + API + '",' + limit + ', "' + offset + '");');
                link.innerText = i;
                list.appendChild(link);
                document.getElementById('UIpages').appendChild(list);
                offset += 21;
                // if ()
            }
            // condtion ends here
        }



    }
    else {
        console.log("no record found")
        output.innerHTML = "";
        let Html_Result = ` <div class="col-md-6">
            <div class="main-content">
            <img src="assets/images/car-logo.jpg" alt="404" style="width: auto; height: auto;">  
            <div class="text-content">
                <h3 class="red-color">`+ Searchvalue.value + ` Not Found</h3>
                <a href="#" onClick="window.location.reload()">View all</a>
            </div>
            </div>                
        </div>`;
        output.innerHTML += Html_Result;
    }
}


// pagination
function PageNumbers(API, limit, offset) {
    API = API + limit + "/" + offset;
    fetch(API)
        .then((rep) => rep.json())
        .then((data) => {
            console.log(data.length);
            for (var i = 0; i < data.length; i = i + 1) {
                (function (i) {

                    setTimeout(function (i) {
                        if (data.length > 0) {
                            output.innerHTML = ""

                            data.forEach(element => {
                                var imageurl = element["CarImage"];
                                imageurl = imageurl.split(' ')[0];
                                let Html_Result = ` <div class="col-md-3 col-sm-6" data-toggle="modal" data-target="#modal-fullscreen-xl"
                                onClick="SelectedCar(${element["id"]})">
                                <div class="vehicle-content theme-yellow">
                                    <div class="vehicle-thumbnail">
                                        <a href="#">
                                            <img src="${imageurl}" alt="${element["name"]}" />
                                        </a>
                                    </div>
                                    <div class="vehicle-bottom-content">
                                        <span class=""><a href="#">${element["name"]}</a></span>
                                        <div class="vehicle-meta">
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                                output.innerHTML += Html_Result;
                            });
                        }
                    }, 0)
                })(i)
            }
        })
        .catch((error) => {
            console.log('Fetch problem : ' + error.message);
            alert("Error, Check Api connection / internet connection")
        })
}




SearchButton.addEventListener('click', (e) => {
    const val = Searchvalue.value;

    if (val === "") {
        alert("value is empty");
    } else {
        // get the first 20 result
        const URL_cars = API + "cars/" + encodeURIComponent(val) + "/20/0";
        const URL_cars_API = API + "cars/" + encodeURIComponent(val);
        console.log(URL_cars);
        fetch(URL_cars)
            .then((rep) => rep.json())
            .then((data) => {
                // get the total number of record in database
                fetch(URL_cars_API)
                    .then((rep) => rep.json())
                    .then((Pagedata) => {
                        // clear the total number and number nav div's
                        TotalRow.innerHTML = "";
                        document.getElementById('UIpages').innerHTML = "";
                        // use the ResultsCount Function to get the total number of result found and number if page navigation
                        ResultsCount(URL_cars_API + "/", Pagedata.length);
                    })
                // the page counting ends below
                for (var i = 0; i < data.length; i = i + 1) {
                    (function (i) {

                        setTimeout(function (i) {
                            if (data.length > 0) {

                                output.innerHTML = "";

                                data.forEach(element => {
                                    var imageurl = element["CarImage"];
                                    imageurl = imageurl.split(' ')[0];
                                    let Html_Result = ` <div class="col-md-3 col-sm-6" data-toggle="modal" data-target="#modal-fullscreen-xl"
                                    onClick="SelectedCar(${element["id"]})">
                                <div class="vehicle-content theme-yellow">
                                    <div class="vehicle-thumbnail">
                                        <a href="#">
                                            <img src="${imageurl}" alt="${element["name"]}" />
                                        </a>
                                    </div>
                                    <div class="vehicle-bottom-content">
                                        <span class=""><a href="#">${element["name"]}</a></span>
                                        <div class="vehicle-meta">
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                                    output.innerHTML += Html_Result;
                                });

                            }

                        }, 0)
                    })(i)
                }


            })
            .catch((error) => {
                console.log('Fetch problem : ' + error.message);
                alert("Error, Check Api connection / internet connection")
            })
    }
})


function SelectedCar(id) {
    // get the first 20 result
    const URL_cars = API + "spec/" + id;
    console.log(URL_cars);
    fetch(URL_cars)
        .then((rep) => rep.json())
        .then((data) => {
            if (data.length > 0) {

                OutputById.innerHTML = "";

                data.forEach(element => {
                    var imageurl = element["CarImage"];
                    imageurl = imageurl.split(' ')[0];
                    var CarTransmission = "";
                    var CarYear = "";
                    var CarSpeed = "";
                    var CarFuelType = "";
                    var CarModel = "";
                    var description = "";
                    // only display details with values: This is because Some of the websites dont have some data  
                    if (element["CarModel"].length > 0) {
                        CarModel = `<li>Model: ${element["CarModel"]}</li>`;
                    } if (element["CarTransmission"].length > 0) {
                        CarTransmission = `<li>Transmission: ${element["CarTransmission"]}</li>`;
                    } if (element["CarYear"].length > 0) {
                        CarYear = `<li>CarYear: ${element["CarYear"]}</li>`;
                    } if (element["CarFuelType"].length > 0) {
                        CarFuelType = `<li>CarFuelType: ${element["CarFuelType"]}</li>`;
                    } if (element["CarSpeed"].length > 0) {
                        CarSpeed = `<li>Speed: ${element["CarSpeed"]}</li>`;
                    }
                    if (element["description"].length > 0) {
                        description = `<span>${element["description"]}</span>`;
                    }
                    // ends here
                    let Html_Result =

                        ` <div class="col-md-12">
                         <div class="vehicle-content theme-yellow">
                             <div class="vehicle-thumbnail">
                                 <a href="#">
                                     <img src="${imageurl}" alt="${element["name"]}" style=" height: auto; " />
                                 </a>
                             </div>
                             <div class="vehicle-bottom-content">
                                 <span class=""><a href="#">${element["name"]}</a></span>
                                 <div class="vehicle-meta">
                                     <div class="meta-item">
                                         <span>Price:  ${element["price"]}</span>
                                     </div>${description}
                                 </div>
                             </div>
                         </div>
                         <div class="price-details">
                            <h3 class="details-title">More Details</h3>
                            <ul>
                            ${CarModel}  ${CarYear} ${CarTransmission} ${CarFuelType} ${CarSpeed}
                                 
                            </ul>
                          
                                <a href="${element["CarUrl"]}" target="_blank" class="view-all-btn" style="background-color: red; color: white; padding: 10px;">View Product</a>
                   
                        </div>
                     </div>`;
                    OutputById.innerHTML += Html_Result;
                    // display related products
                    //IsNot IS to remove the selected Item From the list similar List
                    var IsNot = element["CarId"];
                    var ProductName = element["name"];
                    // indexOf 
                    //(IF this is not done while looking for similar car the search look for BMW X1 SDRIVE 18l and similar product my not be found )
                    // search for BMW X1 instead of BMW X1 SDRIVE 18l
                    // if product name has two words
                    if (ProductName.indexOf(' ') >= 0) {
                        // get the first two word of the product name eg. BMW X1 SDRIVE 18l = BMW X1
                        ProductName = ProductName.split(' ')[0] + " " + ProductName.split(' ')[1];
                        console.log(ProductName);
                    }
                    else {
                        // get the first word of the product eg. BMW = BMW
                        ProductName = ProductName.split(' ')[0]
                        console.log(ProductName);
                    }

                    //


                    RelatedProduct(ProductName, IsNot);
                });


            }



        })
        .catch((error) => {
            console.log('Fetch problem : ' + error.message);
            alert("Error, Check Api connection / internet connection")
        })
}

function RelatedProduct(product, IsNot) {
    // IsNot IS to remove the selected Item From the list similar List
    const URL_cars = API + "similar/" + product + "/" + IsNot;
    console.log(URL_cars);
    fetch(URL_cars)
        .then((rep) => rep.json())
        .then((data) => {

            if (data.length > 0) {

                OutputCompare.innerHTML = "";

                data.forEach(element => {
                    var imageurl = element["CarImage"];
                    imageurl = imageurl.split(' ')[0];
                    //    
                    var CarTransmission = "";
                    var CarYear = "";
                    var CarSpeed = "";
                    var CarFuelType = "";
                    var CarModel = "";
                    var description = "";
                    if (element["CarModel"].length > 0) {
                        CarModel = `<li>Model: ${element["CarModel"]}</li>`;
                    } if (element["CarTransmission"].length > 0) {
                        CarTransmission = `<li>Transmission: ${element["CarTransmission"]}</li>`;
                    } if (element["CarYear"].length > 0) {
                        CarYear = `<li>CarYear: ${element["CarYear"]}</li>`;
                    } if (element["CarFuelType"].length > 0) {
                        CarFuelType = `<li>CarFuelType: ${element["CarFuelType"]}</li>`;
                    } if (element["CarSpeed"].length > 0) {
                        CarSpeed = `<li>Speed: ${element["CarSpeed"]}</li>`;
                    }
                    if (element["description"].length > 0) {
                        description = `<span>${element["description"]}</span>`;
                    }
                    // 
                    let Html_Result = ` 
                                <div class="col-md-3 col-sm-6">
                            <div class="vehicle-content theme-yellow">
                                <div class="vehicle-thumbnail">
                                    <a href="#">
                                        <img src="${imageurl}" alt="${element["name"]}" />
                                    </a>
                                </div>
                                <div class="vehicle-bottom-content" style="height: 240px;">
                                    <span class=""><a href="#">${element["name"]}</a></span>
                                    <div class="vehicle-meta">
                                        <div class="meta-item">
                                            <span>Price:  ${element["price"]}</span>
                                           <span> ${CarModel}</span>
                                            <span> ${CarYear}</span>
                                           <span> ${CarTransmission}</span>
                                           <span> ${CarFuelType}</span>
                                           <span> ${CarSpeed}</span>
                                           
                                        </div>
                                    </div>
                                    <i class="fa fa-globe author-designation"></i><u style=" font-size: small;"><b>${element["website"]}</b></u>
                                    
                                </div><div class="view-all-item" style="float: left; margin-left: 0px;">
                                    <a href="${element["CarUrl"]}" target="_blank"   class="view-all-btn">View Product</a>
                                        </div>
                            </div>
                        </div>`;
                    OutputCompare.innerHTML += Html_Result;
                });
            }
            else {
                var ProductName = product;
                if (ProductName.indexOf(' ') >= 0) {
                    // if product is not found then remove take the first word and do a search
                    ProductName = ProductName.split(' ')[0];
                    RelatedProduct(ProductName, IsNot)
                    //    console.log(ProductName);
                }
                else {
                    // console.log("not found");
                    OutputCompare.innerHTML = "";
                    let Html_Result = ` <div class="col-md-6">
      <div class="main-content">
      <img src="assets/images/car-logo.jpg" alt="404" style="width: auto; height: auto;">  
      <div class="text-content">
          <h3 class="red-color">No similar product found</h3>
          <a href="#" onClick="window.location.reload()">View all</a>
      </div>
      </div>                
      </div>`;

                    OutputCompare.innerHTML += Html_Result;
                }
            }


        })
        .catch((error) => {
            console.log('Fetch problem : ' + error.message);
            alert("Error, Check Api connection / internet connection")
        })
}

