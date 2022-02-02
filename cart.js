var id={
    'Nandi': '100001',
    'Ganesh': '100002',
    'Subramanian': '100004',
    'Horse Rider': '100006',
    'Horse rider': '100007',
    'Hindu Saint': '100008',
    'Siva Mask': '100009',
    "Krishna With Flute" : '100005',
    'Standing Krishna': '100010',
    'Christian Figure': '100011',
    'Krishna And Mother': '100003',
    
}

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
function ready(){
    for(var j=0;j<=sessionStorage.length-1;j++)
    {
            var key = sessionStorage.key(j);
            console.log(key);
            var val = JSON.parse(sessionStorage.getItem(key))
            if(val=="IsThisFirstTime_Log_From_LiveServer") continue;
            addItemToCart(val.title, val.imageSrc)
    }
    var removeCartItemButtons = document.getElementsByClassName('ion-ios-trash-outline')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('input-text qty text')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
}

function enquireCart()
{
    var cartItemContainer = document.getElementsByClassName('table-body')[0]
    var cartRows = cartItemContainer.getElementsByTagName('tr')
    var subject = "I wanna enquire about "
    var mail = document.getElementById("exampleInputEmail1").value;
    var name = document.getElementById("exampleInputName").value
    var phone = document.getElementById("exampleInputNumber").value
    for(var i=0;i<sessionStorage.length;i++)
    {
        subject+=cartRows[i].getElementsByClassName('product-name')[0].innerText
        subject=subject+'('+id[cartRows[i].getElementsByClassName('product-name')[0].innerText]+') '
        subject+=", "
    }
    if(name=="") 
    {
        alert("Enter your name")
    }
    else
    {
        if(phone=="")
        {
            alert("Enter your phone number")
        }
        else
        {
            if(mail=="")
            {
                alert("Enter your email")
            }
            else{
                subject+=". My name is "
                subject+= name
                subject+=". My contact is "
                subject+= phone
                subject+= ", "
                subject+= mail   
                Email.send({
                    Host: "smtp.gmail.com",
                    Username: "trialmailfortest2@gmail.com",
                    Password: "hahaha@123",
                    To: 'indianartsandcurious@gmail.com',
                    From: "trialmailfortest2@gmail.com",
                Subject: "Enquiry Mail",
                Body: subject,
                })
                .then(function (message) {
                alert("enquiry sent successfully")
                }).then(()=>enquireCartWhatsapp())
            }
        }
        
    }

}

function enquireCartWhatsapp()
{
    var src = "https://wa.me/918075336002?text="
    var subject = "Hey, I would like to enquire about "
    var cartItemContainer = document.getElementsByClassName('table-body')[0]
    var cartRows = cartItemContainer.getElementsByTagName('tr')
    var mail = document.getElementById("exampleInputEmail1").value;
    var name = document.getElementById("exampleInputName").value
    for(var i=0;i<sessionStorage.length;i++)
    {
        subject+=cartRows[i].getElementsByClassName('product-name')[0].innerText
        subject=subject+'('+id[cartRows[i].getElementsByClassName('product-name')[0].innerText]+') '
        subject+=", "
    }
    subject+=". My name is "
    subject+= name
    var res = encodeURI(subject);
    src+=res
    window.location.href = src;

}

function addItemToCart(title, imageSrc) {
    var cartRow = document.createElement('tr')
    var cartItemContainer = document.getElementsByClassName('table-body')[0]
    var cartRowContents = `
        <td class="product-thumbnail">
            <a href="#"><img src="${imageSrc}" alt="" height = "150" width = "120"></a>
        </td>
        <td class="product-name">
            <a href="#">${title}</a>
        </td>
        <td class="product-cart-icon product-subtotal"><a href="#"><i class="ion-ios-trash-outline" aria-hidden="true"></i></a></td>`
    cartRow.innerHTML = cartRowContents
    cartItemContainer.append(cartRow)
    cartRow.getElementsByClassName('ion-ios-trash-outline')[0].addEventListener('click', removeCartItem)
}


function removeCartItem(event) {
    event.preventDefault()
    var buttonClicked = event.target
    var h = buttonClicked.parentElement.parentElement.parentElement.getElementsByClassName('product-name')[0].innerText
    sessionStorage.removeItem(h);
    buttonClicked.parentElement.parentElement.parentElement.remove()
}