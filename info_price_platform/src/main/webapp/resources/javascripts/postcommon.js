	function initChangeSelect(){
				$("#search  select[name='pageSize']").change(function(){
					search(1,$("option:selected",this).val());
				});
				$("#search  select[name='cu_pa']").change(function(){
					search($("option:selected",this).val());
				});
			}
	 	initChangeSelect();
	 	
	 	
	 	 jQuery('#sample_1 .group-checkable').change(function () {
	          var set = jQuery(this).attr("data-set");
	          var checked = jQuery(this).is(":checked");
	          jQuery(set).each(function () {
	              if (checked) {
	                  $(this).attr("checked", true);
	                  $(this).parents('tr').addClass("active");
	                  $(this).parent("span").removeAttr("class");
	              } else {
	                  $(this).attr("checked", false);
	                  $(this).parents('tr').removeClass("active");
	                  $(this).parent("span").attr("class","checked");
	              }
	              //$(this).parents('tr').toggleClass("");
	          });
	          jQuery.uniform.update(set);

	      });

	      jQuery('#sample_1 tbody tr .checkboxes').change(function(){
	           $(this).parents('tr').toggleClass("active");
	      });
	      /* table点击选中checkbox*/
	      $("table tbody tr a,table tbody tr :checkbox,table tbody tr button").live("click",
					function(event){
				   event.stopPropagation();
			});
			
			$("table tbody tr").live("click",function(event){
				var $ch = $("input[type='checkbox'][name='id']",this);
				if($ch.attr("checked")=="checked"){	
					 $(this).toggleClass("active");
					$ch.removeAttr("checked");
					$ch.parent("span").removeAttr("class");
				}else{	
					 $(this).toggleClass("active");
					$ch.attr("checked","checked");
					$ch.parent("span").attr("class","checked");
				}
			});
			  /* table点击选中checkbox*/
			/*左侧的置顶按钮*/
			$(function(){
				var $img = $('<img alt="Top_arrow" class="top_arrow" id="top_arrow" src="/resources/images/top_arrow.png" />');
				$("body").append($img);
				    $(window).scroll(
				      function(){
				         $(window).scrollTop() > 20 ? $img.fadeIn(400) : $img.fadeOut(400)
				     });
				     $("body, html").scroll(
				      function(){
				         $("body,html").scrollTop() > 20 ? $img.fadeIn(400) : $img.fadeOut(400)
				      });
				      $img.click(
				       function(){
				         $("body,html").animate({scrollTop:0},400);
				       });

				    $("#top_arrow").hide(),
				    $(window).scroll(
				        function(){
				            $(window).scrollTop() > 20 ? $("#top_arrow").fadeIn(400) : $("#top_arrow").fadeOut(400)
				        }),
				    $("body, html").scroll(
				        function(){
				            $("body,html").scrollTop() > 20 ? $("#top_arrow").fadeIn(400) : $("#top_arrow").fadeOut(400)
				        }),
				    $("#top_arrow").click(
				        function(){
				            $("body,html").animate({scrollTop:0},400);
				        })
				    
				});