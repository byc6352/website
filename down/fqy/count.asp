		<%
		Function ReadFromTextFile (FileUrl,CharSet)
    dim str
    set stm=server.CreateObject("adodb.stream")
    stm.Type=2 '以本模式读取
    stm.mode=3 
    stm.charset=CharSet
    stm.open
    stm.loadfromfile server.MapPath(FileUrl)
    str=stm.readtext
    stm.Close
    set stm=nothing
    ReadFromTextFile=str
		End Function
		
		Sub WriteToTextFile (FileUrl,byval Str,CharSet) 
    set stm=server.CreateObject("adodb.stream")
    stm.Type=2 '以本模式读取
    stm.mode=3
    stm.charset=CharSet
    stm.open
        stm.WriteText str
    stm.SaveToFile server.MapPath(FileUrl),2 
    stm.flush
    stm.Close
    set stm=nothing
		End Sub
		
		sub test(s)
		 response.write(s)
		end sub
		
		sub test2()
			dim fs,fname
			set fs=Server.CreateObject("Scripting.FileSystemObject")
			set fname=fs.CreateTextFile("test.txt",true)
			fname.WriteLine("Hello World!")
			fname.Close
			set fname=nothing
			set fs=nothing
   	end sub
   	
   	dim s
   	dim fn
   	fn="num.txt"
		s=ReadFromTextFile(fn,"utf-8")
		s=s+1
		call WriteToTextFile(fn,s,"utf-8")
		s="app/app.apk"
		'call test(s)
		Response.Redirect(s)
		'Response.Redirect(Request.Form(s))
   	'call test(s)
		%>