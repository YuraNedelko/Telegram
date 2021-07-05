<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

    <link href="{{mix('css/app.css')}}" rel="stylesheet">
    <script src="{{mix('js/app.js')}}"></script>
</head>
<body>
    <div id="react-container"></div>
</body>
</html>
