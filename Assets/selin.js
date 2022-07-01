/*
Selin V1.

*/
(function($) {
    var selino = function() {
        var defaults = {
            years: [new Date().getFullYear()],
            daysTo: [1, 5],    ///  haftanın bu günlerini seçer,
            locale: 'tr',
            order: "asc",
            arrows: {
                iconSet: 'FontAwesome',
                left: '<i class="fa fa-arrow-left"></i>',
                right: '<i class="fa fa-arrow-right"></i>',
                //iconSet: 'Material Design Icons',
                //left: '<i class="mdi mdi-arrow-left"></i>',
                //right: '<i class="mdi mdi-arrow-right"></i>'
            }
        },
            fill = function () {
                var options = $(this).data('selino');
                options.elem.empty();
                options.currentIndex = 0;
                if (options.collector.length == 0) {
                    console.log("Selin! ", "Data boş");
                    return false;
                }
                if (options.order == "asc") {
                    options.collector.SortAsc(); 
                    //options.currentIndex = 0;

                } else {
                    options.collector.SortAsc().reverse(); 
                }

                var elem_buttons = {
                    left: $(doms.buttons.left).clone(),
                    right: $(doms.buttons.right).clone()
                };

                elem_buttons.left.html(options.arrows.left);
                elem_buttons.right.html(options.arrows.right);

                options.elem.append(
                    $(doms.display).find(".inner-of").append(
                        elem_buttons.left,
                        doms.scene,
                        elem_buttons.right)
                );

                var container = $(options.elem).find(".resultcontainer");
                var dc = $("<div/>", {
                    class: "list-group"
                });
                container.empty().html(dc);

                for (i of options.collector) {
                    var mk = twoDateFormat(i);
                    dc.prepend(
                        `<button type="button" class="list-group-item list-group-item-action" data-index="` + i.index + `">` +
                        mk +
                        `</button>`
                    );
                }
                //dc.find("button[data-index=" + (options.currentIndex) + "]").addClass("active");
                $(options.elem).find('.my-drptrigger').on('shown.bs.dropdown', function () {
                    var el = dc.find("button");
                    var totalHeight = $(el).length * $(el).outerHeight(),
                        activeElem = $(dc).find(".active"),
                        activeHeight = (activeElem.outerHeight() * (activeElem.index() + 1)),
                        cHeight = $(container).outerHeight();
                    $(container).scrollTop(
                        activeHeight < cHeight ? 0 :
                            activeHeight - activeElem.outerHeight()
                    );
                });

                dc.find("button[data-index]").on("click", function () {
                    var sindex = $(this).attr("data-index");
                    options.currentIndex = sindex;
                    applySelection.call(options.elem);
                });
                $(elem_buttons.left).bind("click", function () {
                    movePrev.call(options.elem);
                });
                $(elem_buttons.right).bind("click", function () {
                    moveNext.call(options.elem);
                });

                options.currentIndex = options.collector.length - 1;
                /*$(options.elem).find("[data-id=labor]").html(
                    twoDateFormat(options.collector[options.currentIndex], options.locale)
                ).attr("data-index", options.currentIndex);
                */
                applySelection.call(options.elem);

            },
            show = function () { },
            doms = {

                display: `<div class="calendar-wrapper noo-justify-content-center d-flex"><div class="btn-group btn-group-lg inner-of">              
              </div>
            </div>`,
                scene: `<div class="btn-group my-drptrigger">
                  <button type="button" class="btn btn-dark dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span data-id="labor">initiliazing..</span>
                  </button>
                  <div class="dropdown-menu -dropdown-menu-right list-wrpapper rs-container resultcontainer">
                    <!-- loads here -->
                  </div>
                </div>`,
                buttons: {
                    left: `<button type="button" class="btn btn-success" data-rol="shiftToLeft">
                  <!-- Arrow Here -->
                </button>`,
                    right: `<button type="button" class="btn btn-success" data-rol="shiftToRight">
                  <!-- Arrow Here -->
                </button>`
                }
            },
            moveNext = function () {
                var options = $(this).data('selino');

                if (options.currentIndex <= 0) {
                    options.currentIndex = options.collector.length - 1;
                } else {
                    options.currentIndex--;
                }

                applySelection.call(options.elem);
            },
            movePrev = function () {
                var options = $(this).data('selino');
                if ((options.currentIndex) >= options.collector.length - 1) {
                    options.currentIndex = 0;
                } else {
                    options.currentIndex++;
                }
                applySelection.call(options.elem);
            },
            /// create calendar datas
            pring = function (year, month) {
                var options = $(this).data('selino');
                var currentDate = new Date(year, month, 0);
                var currentMonth = currentDate.getMonth(); //new Date().getMonth();
                var today = new Date();


                var getDaysInMonth = function (_month, _year) {
                    return new Date(_year, _month, 0).getDate();
                };

                var dayCount = getDaysInMonth(currentMonth, year);

                for (i = 0; i <= dayCount; i++) {
                    var date = new Date(year, currentMonth, i);
                    var gunDiff = DateDiff.inDays(today, date);

                    if (gunDiff > -1) {
                        //console.log("request is later than today!! " + year + "-" + month + "*", gunDiff);
                        return false;
                    } else {
                        if (date.getDay() == options.firstDay) {
                            let dataIndex = options.collector.length;
                            var newItem = {
                                index: dataIndex,
                                dates: [date, date.addDays(options.lastDay)]
                            };
                            options.collector.push(newItem);
                        }
                    }
                }
                //console.log(year, month)
            },

            /// format the dates
            twoDateFormat = function (data, locale) {
                if (data == undefined)
                    return false;

                var d1 = data.dates[0],
                    d2 = data.dates[1];
                var y = null,
                    m = null,
                    d = null;
                if (d2.getFullYear() == d1.getFullYear()) {
                    y = d1.getFullYear();
                    if (d2.getMonth() == d1.getMonth()) {
                        m = d1.toLocaleDateString(locale, {
                            month: "short"
                        });
                        if (d2.toLocaleString(locale, {
                            day: "numeric"
                        }) ==
                            d1.toLocaleString(locale, {
                                day: "numeric"
                            })) {
                            d = d1.toLocaleString(locale, {
                                day: "numeric"
                            });
                        } else {
                            d = d1.toLocaleString(locale, {
                                day: "numeric"
                            }) + "-" + d2.toLocaleString(locale, {
                                day: "numeric"
                            });
                        }
                        return d + " " + m + " " + y;
                    } else {
                        //return dates;
                        return d1.toLocaleString(locale, {
                            day: "numeric"
                        }) + " " +
                            d1.toLocaleDateString(locale, {
                                month: "short"
                            }) +
                            "-" +
                            d2.toLocaleString(locale, {
                                day: "numeric"
                            }) + " " +
                            d2.toLocaleDateString(locale, {
                                month: "short"
                            }) +
                            " " +
                            d1.getFullYear();
                    }
                } else {

                    return d1.toLocaleDateString(locale, {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                    }) +
                        "-" +
                        d2.toLocaleDateString(locale, {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                        });
                }



            },

            // difference of dates
            DateDiff = {

                inDays: function (d1, d2) {
                    var t2 = d2.getTime();
                    var t1 = d1.getTime();

                    return parseInt((t2 - t1) / (24 * 3600 * 1000));
                },

                inWeeks: function (d1, d2) {
                    var t2 = d2.getTime();
                    var t1 = d1.getTime();

                    return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
                },

                inMonths: function (d1, d2) {
                    var d1Y = d1.getFullYear();
                    var d2Y = d2.getFullYear();
                    var d1M = d1.getMonth();
                    var d2M = d2.getMonth();

                    return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
                },

                inYears: function (d1, d2) {
                    return d2.getFullYear() - d1.getFullYear();
                }
            },

            ///seçilen rangi ekrana yansııtr
            applySelection = function () {
                var options = $(this).data('selino');
                var ci = options.collector.filter(x => x.index == options.currentIndex)[0];
                var mk = twoDateFormat(ci, options.locale);
                $(options.elem).find("[data-id=labor]").html(mk).attr('data-index', ci.index);
                var m1 = $(options.elem).find(".resultcontainer");
                var dc = m1.find(".list-group");
                dc.find(".active").removeClass("active");
                var el = dc.find("button[data-index=" + ci.index + "]");
                //alert(options.currentIndex);
                el.addClass("active");
                options.onChange.apply(this, [options.currentIndex, options.collector[options.currentIndex]]);

                //$(m1).addClass("show").scrollTop($(el).offset().top - ($(m1).height())).removeClass("show");
                //$(m1).show().scrollTop(el.offset().top);
                //return false;
            },

            onInit = function (o) {
                console.log("Selin has inited!", msg);
            },
            onChange = function (f, e) {

            },
            reOrder = function (newOrder) {
                var options = $(this).data('selino');
                options.order = newOrder?? "asc";
                fill.call($(this));
            },
            start = function () {
                console.log("started", $(this));
                var options = $(this).data('selino');
                for (s = 0; s < options.years.length; s++) {
                    var y = options.years[s];
                    for (m = 1; m < 13; m++) {
                        pring.apply(this, [y, m]);
                    }
                }

                fill.call($(this));
            };
      return {
        showSelin: function() {},
        init: function(options) {
          var $options = $.extend({}, defaults, options);
            return this.each(function () {
              var $el = $(this);
              if ($el.data("selino") == undefined) {
                  $options.elem = $el;
                  $options.collector = [];
                  $options.currentIndex = 0;
                  $options.firstDay = $options.daysTo[0];
                  $options.lastDay = $options.daysTo[1];
                  $el.data('selino', $options);
                  if ($el.hasClass("selino-inited")) return;
                  $el.addClass("selino-inited");
                  //onInit();
                  start.apply(this);
                  $options.onInit.apply(this, [$options]);

              }
          });
        },
        /// events
          getDates: function () {
              
          },
          getSelectedDate: function () {
              return this.each(function () {
                  if ($(this).data('selino')) {
                      return options.collector[options.currentIndex - 1];
                  }
              });
          },
          onChangeTrigger: function () {
              return this.each(function () {
                  if ($(this).data('selino')) {
                      var options = $(this).data('selino');
                      options.onChange.apply(this, [options.currentIndex, options.collector[options.currentIndex]]);
                 }
              });
          },
          reOrderTrigger: function (newOrder) {
              return this.each(function () {
                  console.log("newOrder", newOrder);
                  if ($(this).data('selino')) {
                      var options = $(this).data('selino');
                      reOrder.apply(this, [newOrder]);
                  }
              });
          },
      };
    }();
    $.fn.extend({
        Selin: Selino.init,
        Show: Selino.showSelin,
        GetDates: Selino.getDates,
        Apply: Selino.onChangeTrigger,
        GetSelected: Selino.getSelectedDate,
        ReOrder: Selino.reOrderTrigger

    });  
})(jQuery);
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
Array.prototype.SortAsc = function () {
    //console.log("asdasd", this.valueOf());
    var rm = this.valueOf().sort(function (a, b) {
            if (a.index < b.index)
                return 1;
            if (a.index > b.index)
                return -1;
            return 0;
        });
        return rm;
};
/*
Array.prototype.aptionsHelper = function () {
    var ops= $(this).data('selino');
    currentOptions: function (elemOptions) {
        return opt;
    },
    getFisrtDay: function () {
        //console.log("currentOptions",OptionHelper.currentOptions());
        return this.currentOptions()["daysTo"][0]
    },
    getSecondDay: function () {
        //console.log("currentOptions",OptionHelper.currentOptions());
        return this.currentOptions()["daysTo"][1]
    },
    getOptionValue: function (optionName) {
        return this.currentOptions()[optionName]
    },

},
*/
