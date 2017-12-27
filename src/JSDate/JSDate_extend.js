/**
 * 该方法扩展了原JSDate,可单独引用
 * 调用方法 JSDate.functionName
 * version 1.0
 * by panchao 2017/03/17
 */
var JSDate_extend = {
		/**
		 * 不包含结束时间, 通常时间初始化默认这个方法
		 */
		initTime : function(opt){
			//id 时间控件的 id
			//offset 要设置的时间偏移量
			var def = {
					'5m_id' : 'GtimeField_5m',
					'5m_offset' : 0, //默认当前日期当天0点0分 单位：分钟
					'15m_id' : 'GtimeField_15m',
					'15m_offset' : 0, //默认当前日期当天0点0分 单位：分钟
					'hour_id' : 'GtimeField_hour',
					'hour_offset' : -24, //默认前一天 的当前小时 单位：小时
					'day_id' : 'GtimeField_day',
					'day_offset' : -1, //默认前一天 单位：天
					'week_id' : 'GtimeField_week',
					'week_offset' : -1, //默认前一天所在的星期 单位：天
					'month_id' : 'GtimeField_month',
					'month_offset' : -1 //默认上个月一号 单位：月
			}
			opt = JSDate.checkDefault(opt,def);
			
			var date5m = new Date();
			date5m.setMinutes(date5m.getMinutes() + opt['5m_offset']);
			$("#"+opt['5m_id']).val(date5m.format("yyyy-MM-dd 00:00"));
			
			var date15m = new Date();
			date15m.setMinutes(date15m.getMinutes() + opt['15m_offset']);
			$("#"+opt['15m_id']).val(date15m.format("yyyy-MM-dd 00:00"));
			
			var dateHour = new Date();
			dateHour.setHours(dateHour.getHours() + opt.hour_offset);
			$("#"+opt.hour_id).val(dateHour.format("yyyy-MM-dd hh:00"));
			
			var dateDay = new Date();
			dateDay.setDate(dateDay.getDate() + opt.day_offset);
			$("#"+opt.day_id).val(dateDay.format("yyyy-MM-dd"));
			
			var dateWeek = new Date();
			dateWeek.setDate(dateWeek.getDate() + opt.week_offset);
			var tY = dateWeek.getFullYear();
			var tM = dateWeek.getMonth() + 1;
			var tD = dateWeek.getDate();
			var y_w = JSDate.getYearAndWeek(tY, tM, tD);
			$("#"+opt.week_id).val(y_w.year + '年第' + y_w.week + '周');
			
			var dateMonth = new Date();
			dateMonth.setDate(1);
			dateMonth.setMonth(dateMonth.getMonth() + opt.month_offset);
			$("#"+opt.month_id).val(dateMonth.format("yyyy-MM"));
			//绑定事件
			JSDate._initClass(opt);
			return opt;
		},
		
		/**
		 * 初始化时间,包括开始时间和结束时间
		 */
		initTimeStartAndEnd : function(optStart,optEnd){
			var defEnd = {
					'5m_id' : 'timeField_5m',
					'5m_offset' : 0, //默认当前日期当天0点0分 单位：分钟
					'15m_id' : 'timeField_15m',
					'15m_offset' : 0, //默认当前日期当天0点0分 单位：分钟
					'hour_id' : 'timeField_hour',
					'hour_offset' : -24, //默认前一天 的当前小时 单位：小时
					'day_id' : 'timeField_day',
					'day_offset' : -1, //默认前一天 单位：天
					'week_id' : 'timeField_week',
					'week_offset' : -1, //默认前一天所在的星期 单位：天
					'month_id' : 'timeField_month',
					'month_offset' : -1 //默认上个月一号 单位：月
			}
			optEnd = JSDate.checkDefault(optEnd,defEnd);
			//JSDate._initTimeEvent = function(){};
			optStart = JSDate.initTime(optStart);
			optEnd = JSDate.initTime(optEnd);
			
			if($("#"+optStart.day_id).length && $("#"+optEnd.day_id)){
				$("#"+optStart.day_id).on('click',function(){
					WdatePicker({readOnly:true,isShowClear:false,isShowToday:false,dateFmt:'yyyy-MM-dd',maxDate:'#F{$dp.$D(\''+optEnd.day_id+'\')}'});
				});
				$("#"+optEnd.day_id).on('click',function(){
					WdatePicker({readOnly:true,isShowClear:false,isShowToday:false,dateFmt:'yyyy-MM-dd',maxDate:'%y-%M-%d',minDate:'#F{$dp.$D(\''+optStart.day_id+'\')}'});
				});
			}
		},
		/**
		 * 切换时间和绑定事件
		 * @private
		 */
		_initClass : function (opt){
			//切换时间
			$('input[name=timeType]').on('click',function(){
				for(key in opt){
					if(/_id$/.test(key)){
						$('#'+opt[key]).hide();
					}
				}
				var id = opt[$(this).val()+'_id'];
				$('#'+id).show();
			});
			JSDate._initTimeEvent(opt);
		},
		/**
		 * 初始化时间控件事件
		 * @private
		 */
		_initTimeEvent : function(opt){
			//Default 可重写
			$("#"+opt['5m_id']).on('click',function(){
				WdatePicker({readOnly:true,isShowClear:false,isShowToday:false,dateFmt:'yyyy-MM-dd HH:mm',maxDate:'%y-%M-%d %H:%m',
					disabledDates:['....-..-.. ..\:[0-5][1-4,6-9]\:00']});
			});
			$("#"+opt['15m_id']).on('click',function(){
				WdatePicker({readOnly:true,isShowClear:false,isShowToday:false,dateFmt:'yyyy-MM-dd HH:mm',maxDate:'%y-%M-%d %H:%m',
					disabledDates:['....-..-.. ..\:[0235][1-9]\:00','....-..-.. ..\:[1245][0-4]\:00','....-..-.. ..\:[14][6-9]\:00']});
			});
//			var hour_max = '%y-%M-%d {%H+'+opt.hour_offset+'}';
			$("#"+opt.hour_id).on('click',function(){
				WdatePicker({readOnly:true,isShowClear:false,isShowToday:false,dateFmt:'yyyy-MM-dd HH:00',maxDate:'%y-%M-%d %H'});
			});
			$("#"+opt.day_id).on('click',function(){
				WdatePicker({readOnly:true,isShowClear:false,isShowToday:false,dateFmt:'yyyy-MM-dd',maxDate:'%y-%M-%d'});
			});
			$("#"+opt.month_id).on('click',function(){
				WdatePicker({readOnly:true,isShowClear:false,isShowToday:false,dateFmt:'yyyy-MM',maxDate:'%y-%M'});
			});
			$("#"+opt.week_id).on('click',function(){
				WdatePicker({readOnly:true,isShowClear:false,isShowWeek:true,errDealMode:3,maxDate:'%y-%M-%d',autoPickDate:true,firstDayOfWeek:1,
					//onpicked:function() {$dp.$(opt.week_id).value=$dp.cal.getP('y')+'年第'+$dp.cal.getP('W') + '周';}
					onpicked:function() {
						var year = $dp.cal.getP('y');
						var week = $dp.cal.getP('W');
						var date = $dp.cal.getDateStr('MM-dd');
						if(date < '01-08' && week > 2) year--; //周为上一年的最后一周
						$dp.$(opt.week_id).value=year+'年第'+week + '周';}
				})
			});
		},
		/**
		 * 时间格式化
		 */
		formattime : function(time) {
			return time.replace(/[^\d]/g, '');
		},
		/**
		 * 获得一年中的星期 本方法参考自WdatePicker.getWeek
		 */
		getYearWeek : function(y, m, d, C) {
			C = C || 0;//firstDayOfWeek 0 : 周一  1 : 周日
			var A = new Date(y, m - 1, d + C);
			var weekMethod = $dp.weekMethod || "ISO8601";
			if(weekMethod == "ISO8601"){
				A.setDate(A.getDate() - (A.getDay() + 6) % 7 + 3);
				var B = A.valueOf();
				A.setMonth(0);
				A.setDate(4);
				return Math.round((B - A.valueOf()) / (7 * 86400000)) + 1
			}else{
				var _ = new Date($.y,0,1);
				A = Math.round((A.valueOf() - _.valueOf()) / 86400000);
				return Math.ceil((A + (_.getDay() + 1)) / 7)
			}
		},
		/**
		 * 获得年份和星期
		 */
		getYearAndWeek : function(y, m, d) {
			var w = JSDate.getYearWeek(y, m, d);
			if(w == 0){//周为上一年的最后一周
				var dateWeek = new Date(y, 0, 1);
				dateWeek.setDate(dateWeek.getDate()-1);
				var tY = dateWeek.getFullYear();
				var tM = dateWeek.getMonth() + 1;
				var tD = dateWeek.getDate();
				return JSDate.getYearAndWeek(tY, tM, tD);
			}
			return {year : y, week : w};
		},
		/**
		 * 获得星期
		 * @param year
		 * @returns
		 */
		getNumOfWeeks : function(year){
			var d = new Date(year,0,1);
			var yt = ( ( year%4==0 && year%100!=0) || year%400==0)? 366:365; 
			return Math.ceil((yt-d.getDay())/7.0);
		},
		/**
		 * 检查配置,若某配置不存在则用默认值
		 * @param {} opt 配置
		 * @param {} def 默认值
		 * @return {}
		 */
		checkDefault : function(opt,def){
			//若 已加载jquery 则用jquery的方法
			if($ && $.extend){
				var temp = {};
				$.extend(true, temp, def || {},opt || {});
				return temp;
			}
			return opt || {};
		},
		//扩展Date的 format方法
		addFormat : function(){
			//对Date的扩展，将 Date 转化为指定格式的String
			//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符
			//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
			//例子：   
			//(new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
			//(new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
			Date.prototype.format = function(fmt){
				var o = {
						"M+" : this.getMonth()+1,                 //月份   
						"d+" : this.getDate(),                    //日   
						"h+" : this.getHours(),                   //小时   
						"m+" : this.getMinutes(),                 //分   
						"s+" : this.getSeconds(),                 //秒   
						"q+" : Math.floor((this.getMonth()+3)/3), //季度   
						"S"  : this.getMilliseconds()             //毫秒   
				};
				if(/(y+)/.test(fmt)){
					fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
				}
				for(var k in o){
					if(new RegExp("("+ k +")").test(fmt)){
						fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
					}
				}
				return fmt;
			}
		}
};

//检查 Date 是否存在 format方法 若不存在，则加上
if(!(new Date()).format){
	JSDate_extend.addFormat();
}
//扩展原JSDate
window['JSDate'] = JSDate_extend.checkDefault(JSDate_extend,window['JSDate']);//若JSDate不存在 则创建