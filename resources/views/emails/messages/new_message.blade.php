@component('mail::message')
# Introduction

You have a new message from {{$sender}}

{{$text}}

Thanks,<br>
{{ config('app.name') }}
@endcomponent
