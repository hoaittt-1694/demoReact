@section('subject')
    Please Activate your Todo List Manager Account!
@endsection
@section('html')
    <p>Dear <span style="font-weight: bold;">{{ $user->name }},</span></p>
    <p style="color:#4aa0e6; font-size:16px;">Thank you for registering !</p>
    <p>Please activate your account by clicking on below button</p>
    <a _target="blank" href="{{ $verifyUrl }}" style="color:white;font-size:10px">
        <button style="background-color:#4aa0e6;padding:1em;color:white;">
            Activation email
        </button>
    </a>
    <div class="clearfix"></div>
    <p>After your succesfull account activation, you can use our service and we hope to make a difference in your life</p>
    <p>Above link is only valid for 24 hours.</p>
    <span>Regards,</span>
    <div class="cleafix"></div>
    <span style="font-weight: bold;">Group 7 Pro</span>
    <div class="clearfix"></div>
@endsection
@section('text')
    Dear {{ $user->name }},
    Please activate your account by clicking on below link
    {{ $verifyUrl }}
    After your successfull account activation, you can use our service and we hope to make a difference in your life
    Above link is only valid for 24 hours.
    Regards,
    Group 7 Pro
@endsection
