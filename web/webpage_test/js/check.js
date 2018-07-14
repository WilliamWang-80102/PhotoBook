function showTips(id, info) {
                document.getElementById(id + "span").innerHTML = "<font color='gray'>" + info + "</font>";
            }

            function check(id, info) {
                //1.获取用户输入的用户名数据
                var uValue = document.getElementById(id).value;
                //2.进行校验
                if(uValue == "") {
                    document.getElementById(id + "span").innerHTML = "<font color='red'>" + "<br></br><br></br>"+info + "</font>";
                } else {
                    document.getElementById(id + "span").innerHTML = "<br></br>";
                }
            }