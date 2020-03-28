
	function startexport(exporttype){
		sure("本操作将导出当前查询中的所有域名，如果数据太多，请限制搜索范围。<br>导出为CSV文件，这可能需要一点时间，是否继续导出？",function(){		
			var tmpform = $("#tmpform")
			tmpform.empty();
			tmpform.attr("action",apiurl + "?act=export&exporttype="+escape(typeof(exporttype)=="undefined"?"":exporttype));
			tmpform.get(0).submit();
		})
	}
	function saveintro(index){
		var trs = $("#frmintro>table tr");
		if(index==undefined){
			var pdata = $("#frmintro").serialize();
		}else{
			var tr = trs.eq(index);
			var pdata = "did=" + tr.find("input[name=did]").val() + "&intro=" + urlencode(tr.find("input[name=intro]").val());
		}
		Postdata(apiurl,"act=saveintro&" + pdata ,function(result){

			var J = JSON.parse(result);
			if(J.retcode=="200"){
				okalert("保存成功",function(){})
			}else{
				alert(J.retcode);
			}

		})
	}

	function showintro(strids){
		if(strids==undefined){
			var objs = $(document.formdata).find("input[name=domsysid]");
			var arrids = [];
			objs.each(function(){
				arrids.push( this.value );
			})
			strids = arrids.join(',');
		}
		
		winload("myintro&domainids=" + strids, "域名简介-批量设置");
	}

	function batch(){
		var act = formdata.actname.value;
		if(act==""){
			alert("请选择待执行的操作");
			return false;
		}
		if(act!="exportalltxt" && act!="exportallexcel"){
			var objs = $(document.formdata).find("input[name=domsysid]:checked")
			if(objs.size()==0){
				dialogtip("请勾选待操作的域名");
				return false;
			}
			var arrnms = [];
			var arrids = [];
			objs.each(function(){
				arrnms.push( this.title );
				arrids.push( this.value );
			})
		}
		
		var dourl = "";
		var tmpform = $("#tmpform")
		tmpform.empty();

		if(act=="jiaoyi"){
			tmpform.append('<textarea name="hisdomain">' + arrnms.join('\r\n') + '</textarea>');
			dourl = "#";
		}else if(act=="push"){
			tmpform.append('<textarea name="domainlist">' + arrnms.join('\r\n') + '</textarea>');
			dourl = "#";
		}else if(act=="guohu"){
			tmpform.append('<textarea name="domainlist">' + arrnms.join('\r\n') + '</textarea>');
			dourl = "#";
		}else if(act=="promemo"){
			showintro(arrids.join(','));
			return false;
		}else if(act=="modgroup"){
			togroup(arrids.join(','),0);
			return false;
		}else if(act=="renew"){
			tmpform.append('<textarea name="domainid">' + arrnms.join(',') + '');
			dourl = "#";			
		}else if( $.inArray(act,["moddns","modrs","modpwd","modgroup","export","autorenew","whois","url"])>=0 ){
				tmpform.append('<textarea name="redomin">' + arrnms.join('\r\n') + '</textarea>');
				dourl = "#" + act;
		}else if(act=="mylock" || act=="unmylock"){
				setdmlock(act);
				return false;
		}else if(act=="exportalltxt" || act=="exportallexcel"){
			dourl="/user/domain/do.asp"
			tmpform.append("<input type=\"hidden\" name=\"act\" value=\"export\">");
			tmpform.append("<input type=\"hidden\" name=\"exporttype\" value=\""+ act +"\">");
		}else if(act=="exportexcel"  || act=="exporttxt"){
			dourl="/user/domain/do.asp"
			tmpform.append("<input type=\"hidden\" name=\"domainlist\" value=\""+ arrnms.join(',') +"\">");
			tmpform.append("<input type=\"hidden\" name=\"act\" value=\"export\">");
			tmpform.append("<input type=\"hidden\" name=\"exporttype\" value=\""+ act +"\">");
		}else if(act=="downpai"){
			showdownpai(arrnms);
			return false;
		}else if(act=="xyz6box"){
			showxyz6box(arrnms);
			return false;
		}else{
			return false;
		}
		tmpform.attr("action",dourl);
		tmpform.get(0).submit();
	}


	function setdmlock(act_)
	{	
		act_txt="您确定要将选中域名进行锁定操作？<br><font color=red>域名设置锁定状态后，不能修改DNS、不能转出、不能发布交易（防止重要域名被误卖）。若要进行以上操作，需要先解锁。</font>"
		if(act_=="unmylock"){act_txt="您确定要将选中域名进行取消锁定操作？"}
		
		$.dialog.confirm(act_txt,function(){
				loadbusy = true;
				waitloading(true);
				var pdata = $("form[name='formdata']").serialize();
				pdata=pdata+"&r=" + escape(sysusername);
				$.ajax({
					url:apiurl
					,type:"get"
					,dataType:"json"
					,data:"act="+act_+"&" + pdata
					,success: function(json){
						if(json.code=="200")
						{
						 
						 
							if(json.errdomain!="")
							{
								alertmsg="操作成功。其中失败域名有["+json.errdomain+"]"	
							}else{
								alertmsg="操作成功，请刷新后查看"
							}
							alert(alertmsg)
						}else{
							alert(json.msg)
							}
					}
					,error:function(ex,txtstatus){
						if(ex.readyState!=0){
							$.dialog.confirm("<p>非常抱歉！网络错误！</p><p>请点击<font color=red>确定</font>将跳转到<a href=\" /user/domain/domainlist_jyb.asp\"><font color=blue><b>兼容版</b></font></a>进行访问，或点击<font color=red>取消</font>后，进行手动刷新重试</p>",function(){
								location.href='/user/domain/domainlist_jyb.asp'
							})
							//$.dialog.alert("<p>网络错误，请手工刷新一次！如果仍不行</p><p>请点击 <a href=\" /user/domain/default_old_nojson.asp\"><font color=blue><b>兼容版</b></font></a> 版进行访问</p>")
						}// alert('网络错误，请手工刷新一次，谢谢！' + ex.responseText + ' ' + txtstatus)
					}
					,complete:function(obj){
						obj=null;
						loadbusy=false;
						waitloading(false);
					}
				})

			})
		
		
	}

	function showxyz6box(domainarr){
		var str = '<form action="/web/xyzactive" method="post">';
		str+= '<div class="xyz6div">';
		str+= '<p style="color:#666;margin-bottom:10px;">待续费域名列表，您可以修改后再提交：</p>';
		str+= '<textarea name="domains" placeholder="每行一个域名">' + domainarr.join("\n") + '</textarea><br>';
		str+= '<input type="submit" value="下一步" class="bluebtn width100">&nbsp;&nbsp;<input type="button" value="取消" onclick="winclose()" class="graybtn width60" >';
		str+= '</div>'
		str+= '</form>'
		var api = $.dialog({id:'L1360',title:"域名列表编辑"});
		api.content(str);
	}
	function showdownpai(domainarr){
			var api = $.dialog({id:'L1360',title:"域名批量下架"});
			Postdata("/user/paimai/do.asp","act=showdown&val=" + domainarr.join(','),function(data){
				api.content(data);
			})
	}


	function setshowtimespan()
	{
		var obj_=$("select[name='datename']");
		if(obj_.val()=="in")
		{
			$("#showtimespan").attr("tag","in")
			$("#showtimespan").html("入库时间")
		}else{
			$("#showtimespan").attr("tag","reg")
			$("#showtimespan").html("注册时间")
		}
	}
	function loaddata(isappend){
		loadbusy = true;
		waitloading(true);
		setshowtimespan()
		var pdata = $(winform).serialize();
		pdata=pdata+"&r=" + escape(sysusername) + "&r2="+Math.random()
		$.ajax({
			url:apiurl
			,type:"get"
			,dataType:"json"
			,data:"act=list&" + pdata
			,success: function(json){
				if( isappend!='yes') $("#jsondata").empty();
				pageno = parseInt(json.pageno);
				pagecount = parseInt(json.pagecount);
				filldata(json);
				fillpage(json);
			}
			,error:function(ex,txtstatus){
				if(ex.readyState!=0)
				{
				$.dialog.confirm("<p>非常抱歉！网络错误！</p><p>请点击<font color=red>确定</font>将跳转到<a href=\" /user/domain/default_old_nojson.asp\"><font color=blue><b>兼容版</b></font></a>进行访问，或点击<font color=red>取消</font>后，进行手动刷新重试</p>",function(){
								location.href='/user/domain/default_old_nojson.asp'
							})
				}
				//if(ex.readyState!=0) alert('<p>网络错误，请手工刷新一次！如果仍不行</p><p> 请点击 <a href=\" /user/domain/default_old_nojson.asp\"><font color=blue><b>兼容版</b></font></a> 版进行访问</p>' )
			}
			,complete:function(obj){
				obj=null;
				loadbusy=false;
				waitloading(false);
			}
		})
	}

	function loadmore(obj){
		if(loadbusy) return false;
		loadbusy = true;
		pageno++;
		winform.pageno.value = pageno;
		$(obj).parent().text("第.." + pageno + "..页");
		loaddata('yes');
	}

	function filldata(ojson){
		var html = '';
		var lockTplHtml = $("#J_domainTipTpl").html();
		$.each(ojson.datas,function(cur,json){
			
			var strgroup = groupjson[json.g_id];
			if(strgroup==undefined) strgroup="无";
			//if(strgroup.length>5) strgroup=strgroup.substr(0,5) + '..';			
			if(strgroup=="无") strgroup="<a href='javascript:void(0)' onclick='togroup(" + json.did + ",0)'>无</a>";

			var strtips = json.tips;
			if(strtips==undefined) strtips="";
			var strstate = json.txtstate;
			strtips=strtips.replace('<idn/>','<span title="此域名非英文域名 --- 国际化域名IDNs (Internationalized Domain Names)也称多语种域名，是指非英语国家为推广本国语言的域名系统的一个总称，例如含有日文的为日文域名，含有中文的域名为中文域名。交易此类域名时请务必注意识别。">(IDN)</span>');

//			other_msg=""
//			if (strstate.indexOf('<expired/>')!=-1)
//			{
//			  other_msg='<br><span class="fred">(已经到期)</span>'
//			}
//			if (strstate.indexOf('<expire/>')!=-1)
//			{
//			   other_msg='<br><span style="color:#FF4A4A">(即将到期)</span>'
//			}

			strtips=strtips.replace('<dns/>','<span>(DNS域名)</span>');
			strtips=strtips.replace('<mylock/>','<span>(自锁)</span>');

			strstate=strstate.replace('<expired/>','<span class="fred">已经到期</span>');  //
			strstate=strstate.replace('<expire/>','<span style="color:#FF4A4A">即将到期</span>');  //
			strstate=strstate.replace('<hold/>','<span style="color:#FF00FF">Hold</span>');
			strstate=strstate.replace('<transin/>','<span style="color:#666600">正在转入</span>');
			strstate=strstate.replace('<transout/>','<span style="color:#B34BC8">正在转出</span>');
			strstate=strstate.replace('<paimai/>','<span style="color:#3399FF;"><a href="/services/paimai/show.asp?pdom=' + json.endomain + '" target="_blank">正在交易中</a></span>');
			strstate=strstate.replace('<lock/>',lockTplHtml);
		

			 
			var strexdate = json.exdate;
			if( json.txtstate.indexOf('<transin')>-1) strexdate = '---';
			if( json.txtstate.indexOf('<expire')>-1) strexdate = '<span class="fred">' + strexdate + '</span>';

			var arrmemo = json.p_memo.split('@');
			if($.inArray(arrmemo[0],["0","1","2","3","4","5"])==-1) arrmemo[0]=0;

			html+= '<tr>';			
			html+= '<td><input type="checkbox" name="domsysid" value="' + json.did + '" title="' + json.endomain + '" /></td>';
			html+= '<td><a href="domainctr.asp?domainid=' + json.did + '" target="_blank">' + json.domain + '</a>' + strtips + '</td>';
			html+= '<td>' + json.crdate +'</td>';
			html+= '<td>' + strexdate + '</td>';
			html+= '<td>' + strstate + '</td>';
			html+= '<td style="white-space:nowrap">' + strgroup + '</td>';

			html+= '<td>';
			
			if( strstate.indexOf('转入')>0 ){
				html+= '<div class="floatl marginr20"><a href="/user/domain/zhuanru.asp">查看</a></div>';
			}else if(clonefrom=="xyz6"){
				//..
			}else{
				html+= '<div class="floatl managelink marginr5"><a href="javascript:void(0)">操作 <i class="arrowdown"></i>&nbsp;</a><ul class="morelink"><li><a href="../push/pushdomain.asp?domainlist=' + json.domain + '" target="_blank"><i class="domainicon position1"></i>PUSH</a></li><li><a href="/user/domain/rsall.asp?domainid=' + json.did + '"><i class="domainicon position2"></i>解析</a></li><li><a href="javascript:void(0)" onclick="editpromemo(this,' + json.did + ')"  tag="' + arrmemo[0] + '" title="' + arrmemo[1] + '" ><i class="domainicon position3"></i>备注</a></li><li><a href="/user/paimai/add.asp?hisdomain=' + json.domain + '" target="_blank"><i class="domainicon position4"></i>出售</a></li></ul></div><div class="floatl marginr15"><a  href="renewDomain.asp?domainid=' + json.did + '" target="_blank">续费</a></div><div class="floatl marginr20"><a href="domainctr.asp?domainid=' + json.did + '">管理</a></div>';
			}
			html+= '<div class="floatl"><img src="/newimages/user/op_memo_' + arrmemo[0] + '.png" tag="' + arrmemo[0] + '" title="' + arrmemo[1] + '" tips="设置备注" onclick="editpromemo(this,'+json.did+ ')"></div>';
			
			html+= '</td>';

			html+= '</tr>';

		});
		if(html=='') html='<tr><td colspan="7" align="center">没有符合条件的域名</td></tr>';

		if(ojson.active=="xyz6"){
			$("#active_dv").show();
		}else{
			$("#active_dv").hide();
		}

		if( pageno < pagecount){
			html += '<tr><td colspan="7"><center><a href="javascript:void(0)" onclick="loadmore(this);return false;">加载更多……</a></center></td></tr>';
		}

		$("#jsondata").append(html);
	}

	function fillpage(ojson){
		var pdiv = $("#jsonpage");
		pdiv.find("span.jcount").text( ojson.rowcount );
		$("#page_num").html('共有<span class="OrangeText">'+ojson.rowcount+'</span>个域名');
		var intP1=pageno-1;
		var intP2=pageno+1;
		if (intP1<1) intP1=1;
		if (intP2>pagecount) intP2=pagecount;
		var pstrng="", pstrlook="", pstrlook2="",pstrlook3="", phtml="";
		for(var ii=intP1;ii<=intP2;ii++)
		{
			if (ii!=pageno){
				pstrng += '<li><a onclick="pageload(' + ii + ')">'+ii+'</a></li>';
			}else{
				pstrng += '<li class="active"><a>'+ii+'</a></li>';
			}
		}
		if (intP1>1) pstrlook = '<li><a onclick="pageload(' + (intP1-3) + ')">..</a></li>';
		if (intP2<pagecount) {
			pstrlook2 = '<li><a onclick="pageload('+ (intP2+3) +')">..</a></li>';
			pstrlook2 += '<li><a onclick="pageload(' + pagecount + ')">' + pagecount + '</a></li>';
		}
		
		var phtml= '<li><a onclick="pageload(1)">&laquo;</a></li>'; //var phtml= '<li class="disabled" ><a >&laquo;</a></li>';
		phtml+= '<li><a onclick="pageload(' + intP1 + ')">&lsaquo;</a></li>';
		phtml+= pstrlook + pstrng + pstrlook2;
		phtml+= '<li><a onclick="pageload(' + intP2 + ')">&rsaquo;</a></li>';
		phtml+= '<li><a onclick="pageload(' + pagecount + ')">&raquo;</a></li>';
		pdiv.find("ul.pagenavlist").html(phtml);
		
	}

	function clickload(){
		if(loadbusy) return false;
		$(winform).find("select").each(function(){
			if(this.selectedIndex>0){
				$(this).parent().addClass("redborder");
			}else{
				$(this).parent().removeClass("redborder");
			}
		})
		var strpagesize= winform.pagesize.value
		if( /^\d+$/.test(strpagesize) ){
			if( parseInt(strpagesize)>2000){
				alert("每页显示记录最大设置2000条");
				return false;
			}
		}
		pageno=1;
		winform.pageno.value = 1;
		loaddata();
	}

	function pageload(n){
		if(loadbusy) return false;
		if(n<1 || n>pagecount || pageno==n ) return false;
		winform.pageno.value = n;
		loaddata();
	}

	function bindkeyboard(){
		$(document).keyup(function(e){
			var id=e.keyCode;
			switch(id){
				case 37: pageload_("-");
					break;
				case 39: pageload_("+");
					break;
			}
		})
	}

	function pageload_(act){
		var p="";
		if(act==""){
			p=$("#jsonpage input.jtopage").val();
		}else if(act=="+"){
			p=pageno+1;
		}else if(act=="-"){
			p=pageno-1;
		}
		if(!/\d+/.test(p)){
			dialogtip("页码错误，应该填写数字")
		}else if(parseInt(p)>pagecount){
			dialogtip("最大页码为" + pagecount)
		}else if(parseInt(p)==pageno){
			dialogtip("当前已经是第" + p + "页");
		}else{
			pageload(p);			
		}
	}

	function selectall(this_,forname){
		$("input:checkbox[name=" + forname + "]").each(function(){
			this.checked=this_.checked;
		})
	}

	function editpromemo(obj,did){
		var imemo = $(obj).attr("title");
		var iclass = $(obj).attr("tag");
		var classhtm = "";
		for(var i=0;i<=5;i++){
			classhtm+= '<label><input type="radio" name="qizhi" value="' + i + '"' + ( iclass==i?" checked": "") + ' /><img src="/newimages/user/op_memo_' + i + '.png" /></label>&nbsp;&nbsp;';
		}
		if(imemo==undefined) imemo='';

		var html = '<form name="frmeditintro"><table>';
		html+= '<tr><th>等级：</th><td>' + classhtm + '</td></tr>';
		html+= '<tr><th>备注：</th><td><textarea name="intro" style="width:280px;height:50px">' + imemo + '</textarea></td></tr>';
		html+= '<tr><td colspan="2"><input type="hidden" name="did" value="' + did + '"/><input type="hidden" name="act" value="saveintro" /></td></tr>';
		html+= '</table></form>';

		$.dialog({
			title: '编辑域名备注',
			content: html,
			max:false,
			min:false,
			ok: function(){
				//this.title('3秒后自动关闭').time(3);
				$.post(apiurl, $(window.document.frmeditintro).serialize() ,function(result){
					var J = JSON.parse(result);
					if(J.retcode=="200"){
						$.dialog.tips("保存成功，设置空白可删除")
					}else{
						alert(J.retcode);
					}
				})
				this.close();

				return false;
			},
			cancelVal: '关闭',
			cancel: true
		});

	}
	function editpromemo_(obj,id){
		var deftxt = $(obj).attr("title")
		var tips = $(obj).attr("tips");
		if(!tips) tips = "设置域名备注";
		if(deftxt=="编辑") deftxt="";
		$.dialog.prompt(tips, function(remark){
			$.post(apiurl,"act=saveintro&did="+id+"&intro=" + escape(remark),function(result){
				var J = JSON.parse(result);
				if(J.retcode=="200"){
					if(remark=="") {
						$.dialog.tips("备注已删除")
					}else{
						$.dialog.tips("保存成功")
					}
				}else{
					alert(J.retcode);
				}
			})
		},deftxt)
	}

	function winload(act,ititle){
		var api = $.dialog({id:'L1360',title:ititle});
		Postdata(apiurl,"act=" + act,function(data){
			api.content(data);
		})
	}

	function winclose(){
		$.dialog({id:'L1360'}).close();
	}

	function dogroupcmd(this_,act){
		
		if(act=="show"){
			if(this_.options[this_.selectedIndex].value=='addnew'){
				this_.selectedIndex = 0;
				winload("mygroup","域名分组管理");
			}
		}else{

			var otr=$(this_).parent().parent();
			var gid=otr.find("input[name=gid]");
			var gname=otr.find("input[name=gname]");
			if(act!="del" && gname.attr("title") == gname.val() ){
				dialogtip("请设置新的名称");
				return false;
			}
			if(act!="del" && gname.val()==""){
				dialogtip("分组名称不能为空");
				return false;
			}
			if(act=="del"){
				if(!confirm("确定删除这个分组吗？")) return false;
			}
			var strname = gname.val();
			postdata(apiurl,"act=groupcmd&act2=" + act + "&gid=" + gid.val() + "&gname=" + urlencode(strname),function(result){
				var J = JSON.parse(result);
				if(J.code.substr(0,3)=="200"){
					gname.attr("title", strname );

					if(act=="del"){
						dialogtip("删除成功");
						otr.remove();
					}else if(act=="add"){
						gname.val("");
						dialogtip("添加成功");
						otr.parent().append("<tr><td>新</td><td><span class='fgreen'>"+strname+"</span></td></tr>");
					}else if(act=="edit"){
						dialogtip("修改成功");
					}
				}else{
					alert( J.code);
				}
			})
		}
		
	}

	
	function togroup(did,gid){
		winload("togroup&did="+did+"&gid="+gid,"设置域名到组");
	}

	function savegroup(objform){
		if(objform.gid.value==""){
			alert("请选择分组，若没有请先添加");
		}else if(objform.did.value==""){
			alert("没有操作对象");
		}else{
			postdata(apiurl,"act=savegroup&did=" + objform.did.value + "&gid=" + objform.gid.value ,function(result){
				var J = JSON.parse(result);
				if(J.code.substr(0,3)=="200"){
					dialogtip("<span class='fgreen'>编辑成功</span>");
					loaddata();
					//setTimeout("winclose()",500);
					winclose()
				}else{
					alert( result );
				}
			})
		}
	}