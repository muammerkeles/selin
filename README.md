# Selin

Komponent, belirlenen tarih aralığı içindeki haftanın seçilen günlerini listelemyi sağlar.

```html
    <div class="my-element">
        <!-- component burada oluşturulur-->
    </div>
```
```js
    $(".my-element").Selin({ 
		years: [2019, 2020, 2021],
		daysTo:[2,3],  // haftanın kaçıncı günlerinin seçilecegini belirler
		locale:'tr', // dil ve haftanın ilk  gününü belirlemek için lokalizasyon
		recycle:false, // dönüş bittiğinde başa sar/sarma
		order:"desc", // veya "asc" ile listeyi sorting eder
		arrows: {	/// sağ-sol okları
			//iconSet: 'FontAwesome',
			//left: '<i class="fa fa-arrow-left"></i>',
			//right: '<i class="fa fa-arrow-right"></i>',
			iconSet: 'MaterialDesignIcons',
			left: '<i class="mdi mdi-arrow-left"></i>',
			right: '<i class="mdi mdi-arrow-right"></i>'

		},
		onChange: function (currentIndex, currentDates) {
			//currentIndex, collector[currentIndex]
			console.log("currentIndex", currentIndex);
			console.log("currentDates", currentDates);
		},
		 onInit: function (options) {
			console.log("Selin has inited!", options);
		}
    }); 


```
|Option | Type | Default | Value |
|---|:---:|:---:|---|
|years  | Array []  | '2019'    | Birden fazla yıl girilebilir. |
|daysTo | Array[]   | [1,5]     | Haftanın kaçıncı günlerinin işleneceği|
|locale | String    | 'tr'      | Dil ve haftanın ilk  günü için lokalizasyon|
|recycle| Boolean   | false     | true - false |
|order	| String	| "asc"		| "asc" - "desc" |
|arrows | array[] 	| iconSet: 'FontAwesome',left: '<i class="fa fa-arrow-left"></i>',right: '<i class="fa fa-arrow-right"></i>'|
				

---

## Demo 
 - http://muammerkeles.com/github/selin/ 

---

## CSS

*   https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css
*   https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.0/css/bootstrap.min.css
*   assets/style.css

## JS 
*   https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js
*   https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js
*    https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js
*   Assets/selin.js
