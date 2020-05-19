//console.clear();


(function($) {
    var Selino = function() {
      var defaults = {
          years: [new Date().getFullYear()]
        },
        elem,
        collector = [],
        currentIndex = 0,
        fill = function() {
          elem.append(
            $(doms.display).find(".inner-of").append(
              doms.buttons.left, doms.scene,
              doms.buttons.right)
          );
  
          var container = $(elem).find(".resultcontainer");
          var dc = $("<div/>", {
            class: "list-group"
          });
          container.empty().html(dc);
  
          for (i of collector) {
            var mk = twoDateFormat(i);
            dc.prepend(
              `<button type="button" class="list-group-item list-group-item-action" data-index="` + i.index + `">` +
              mk +
              `</button>`
            );
          }
          $(elem).find("[data-id=labor]").html(twoDateFormat(collector[currentIndex])).
          attr("data-index", currentIndex);
          dc.find("button[data-index]").on("click", function() {
            var sindex = $(this).attr("data-index");
            currentIndex = sindex;
            applySelection()
          });
  
          elem.find('button[data-rol="shiftToLeft"]').bind("click", movePrev);
          elem.find('button[data-rol="shiftToRight"]').bind("click", moveNext);
          currentIndex = collector.length;
                  //applySelection();
        },
        show = function() {},
        doms = {
  
          display: `<div class="calendar-wrapper noo-justify-content-center d-flex"><div class="btn-group btn-group-lg inner-of">              
              </div>
            </div>`,
          scene: `<div class="btn-group">
                  <button type="button" class="btn btn-dark dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span data-id="labor">initiliazing..</span>
                  </button>
                  <div class="dropdown-menu -dropdown-menu-right list-wrpapper rs-container resultcontainer">
                    <!-- loads here -->
                  </div>
                </div>`,
          buttons: {
            left: `<button type="button" class="btn btn-success" data-rol="shiftToLeft">
                  <i class="fa fa-arrow-left"></i>
                </button>`,
            right: `<button type="button" class="btn btn-success" data-rol="shiftToRight">
                  <i class="fa fa-arrow-right"></i>
                </button>`
          }
        },
        moveNext = function() {
          if (currentIndex <= 0) {
            alert("reached zero !")
            return false;
          }
          currentIndex--;
          applySelection();
        },
        movePrev = function() {
          if ((currentIndex ) >= collector.length) {
            alert("reached the last index!")
            return false;
          }
          currentIndex++;
          applySelection();
        },
        /// create calendar datas
        pring = function(year, month) {
          var currentDate = new Date(year, month, 0);
          var currentMonth = currentDate.getMonth(); //new Date().getMonth();
          var today = new Date();
  
  
          var getDaysInMonth = function(_month, _year) {
            return new Date(_year, _month, 0).getDate();
          };
          var dayCount = getDaysInMonth(currentMonth, year);
          for (i = 0; i <= dayCount; i++) {
  
  
            var date = new Date(year, currentMonth, i);
            var gunDiff = DateDiff.inDays(today, date);
  
            if (gunDiff > -1) {
              console.log("request is later than today!! " + year + "-" + month + "*", gunDiff);
              return false;
            } else {
  
  
              if (date.getDay() == 1) {
                let dataIndex = collector.length;
                var newItem = {
                  index: dataIndex,
                  dates: [date, date.addDays(5)]
                };
                collector.push(newItem);
                //$("#labor").html(TwoDateFormat(newItem)).attr("data-index", dataIndex);
                //currentIndex = 0;//collector.length-1;
              }
            }
          }
        },
  
        /// format the dates
        twoDateFormat = function(data) {
          var d1 = data.dates[0],
            d2 = data.dates[1];
          var y = null,
            m = null,
            d = null;
  
          if (d2.getFullYear() == d1.getFullYear()) {
            y = d1.getFullYear();
            if (d2.getMonth() == d1.getMonth()) {
              m = d1.toLocaleDateString("tr", {
                month: "short"
              });
              if (d2.toLocaleString("tr", {
                  day: "numeric"
                }) ==
                d1.toLocaleString("tr", {
                  day: "numeric"
                })) {
                d = d1.toLocaleString("tr", {
                  day: "numeric"
                });
              } else {
                d = d1.toLocaleString("tr", {
                  day: "numeric"
                }) + "-" + d2.toLocaleString("tr", {
                  day: "numeric"
                });
              }
              return d + " " + m + " " + y;
            } else {
              //return dates;
              return d1.toLocaleString("tr", {
                  day: "numeric"
                }) + " " +
                d1.toLocaleDateString("tr", {
                  month: "short"
                }) +
                "-" +
                d2.toLocaleString("tr", {
                  day: "numeric"
                }) + " " +
                d2.toLocaleDateString("tr", {
                  month: "short"
                }) +
                " " +
                d1.getFullYear();
            }
          } else {
  
            return d1.toLocaleDateString("tr", {
                day: "numeric",
                month: "short",
                year: "numeric"
              }) +
              "-" +
              d2.toLocaleDateString("tr", {
                day: "numeric",
                month: "short",
                year: "numeric"
              });
          }
  
  
  
        },
  
        // difference of dates
        DateDiff = {
  
          inDays: function(d1, d2) {
            var t2 = d2.getTime();
            var t1 = d1.getTime();
  
            return parseInt((t2 - t1) / (24 * 3600 * 1000));
          },
  
          inWeeks: function(d1, d2) {
            var t2 = d2.getTime();
            var t1 = d1.getTime();
  
            return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
          },
  
          inMonths: function(d1, d2) {
            var d1Y = d1.getFullYear();
            var d2Y = d2.getFullYear();
            var d1M = d1.getMonth();
            var d2M = d2.getMonth();
  
            return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
          },
  
          inYears: function(d1, d2) {
            return d2.getFullYear() - d1.getFullYear();
          }
        },
  
        ///seçilen rangi ekrana yansııtr
        applySelection = function() {
                  console.log("ci",currentIndex);
          var ci = collector[currentIndex]
          var mk = twoDateFormat(ci);
          $(elem).find("[data-id=labor]").html(mk).attr('data-index', currentIndex);
          var m1 = $(elem).find(".resultcontainer");
          var dc = m1.find(".list-group");
          dc.find(".active").removeClass("active");
          var el = dc.find("button[data-index=" + currentIndex + "]");
          //alert(currentIndex);
          el.addClass("active");
  
        },
  
        start = function() {
          console.log("started", elem);
          var options = $(elem).data('selino');
          for (i = 0; i < options.years.length; i++) {
            var y = options.years[i];
            for (m = 1; m < 13; m++) {
              pring(y, m);
            }
          }
          fill();
        };
  
      return {
        showSelin: function() {},
        init: function(options) {
          var $options = $.extend({}, defaults, options);
  
          return this.each(function() {
            var $el = $(this);
            elem = $el;
            $el.data('selino', $options);
            console.log("inited", $el.data('selin'));
            if ($el.hasClass("selino-inited")) return;
            $el.addClass("selino-inited");
            start();
          });
        }
  
      };
    }();
  
  
    $.fn.extend({
  
      Selin: Selino.init,
      Show: Selino.showSelin,
    });
  
  
  })(jQuery);
  Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  }
  
  //////////////////////////////////////////////
   window.addEventListener("load", function(event) {
      reInitSelin();
    });
  
    function reInitSelin() {
    console.log("postponding..");
      if (typeof $.fn.Selin != "function") {
        setTimeout(function() {
          console.log("postponding..");
          reInitSelin();
        }, 2500);
        return false;
      }
      $(".selino").Selin({
        years: [2019, 2020, 2021]
      });
    }