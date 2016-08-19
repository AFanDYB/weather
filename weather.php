<?php
	header('Access-Control-Allow-Origin:*');
	//$_GET['num'];
	//$_GET['page'];
	//echo '请求多少行新闻'.$_GET['num'].'页数'.$_GET['page'];
    $ch = curl_init();
    //$url = 'http://apis.baidu.com/txapi/social/social?num=10&page=1';
	$url = 'http://apis.baidu.com/heweather/weather/free?city='.$_GET['city'];
    $header = array(
        'apikey: 24ac70340eed16b179e88c5327b60256',
    );
    // 添加apikey到header
    curl_setopt($ch, CURLOPT_HTTPHEADER  , $header);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    // 执行HTTP请求
    curl_setopt($ch , CURLOPT_URL , $url);
    $res = curl_exec($ch);

    //var_dump(json_decode($res));
	echo $res;
?>