from django.shortcuts import render, redirect
from django.contrib.auth import authenticate,login,logout
from django.contrib import messages


from userauths.models import User, Profile
from userauths.forms import UserRegisterForm

def RegisterView(request):

    if request.user.is_authenticated:
        messages.warning(request, f"You are already logged in.")
        return redirect("hotel:index")
    form = UserRegisterForm(request.POST or None)
   #print("form ====", form)
    if form.is_valid():
        form.save()
        full_name = form.cleaned_data.get("full_name")
        phone = form.cleaned_data.get("phone")
        email = form.cleaned_data.get("email")
        password = form.cleaned_data.get("password1")
        #print("full name====",full_name)

        user = authenticate(email=email, password=password)
        login(request, user)

        messages.success(request, f"Hey {full_name}, your account has been created susscessfully.")

        profile = Profile.objects.get(user=request.user)
        profile.full_name = full_name
        profile.phone = phone
        profile.save()

        return redirect("hotel:index")
    context = {
        "form":form
    }
    return render(request, "userauths/sign-up.html",context)

def loginViewTemp(request):
    if request.user.is_authenticated: 
        messages.warning(request, "You are already logged in")
        return redirect("hotel:index")
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")

        try:
            #user = User.objects.get(email=email)
            user_query = User.objects.get(email=email)
            user_auth = authenticate(request, email=email,password=password)
            if user_query is not None:
                login(request, user_auth)
                messages.success(request, "You are logged in")
                next_url = request.GET.get("next","hotel:index")
                return redirect(next_url)
            else:
                messages.error(request, "Username or password does not exist")
                return redirect("userauths:sign-in")
        except:
            messages.error(request, "Username does not exist")
            return redirect("userauths:sign-in")
    return render(request, "userauths/sign-in.html")

def logoutView(request):
    logout(request)
    messages.success(request, "You have been logged out")
    return redirect("userauths:sign-in")
