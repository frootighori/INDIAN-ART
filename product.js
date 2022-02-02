if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
function ready(){
    let addToCartButtons = document.getElementsByClassName('product-addtocart')
    console.log(addToCartButtons)
    document.getElementsByClassName("count-style")[0].innerText = sessionStorage.length
    for (var i = 0; i < addToCartButtons.length; i++) {
        let r = i
        let button = addToCartButtons[i]
        button.addEventListener('click',(evt) => addToCartClicked(r, evt))
    }
    var removeCartItemButtons = document.getElementsByClassName('ti-trash')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    var modelCart = document.getElementsByClassName('quickview-btn-cart')
    for(var i=0;i<modelCart.length;i++)
    {
        var button = modelCart[i]
        button.addEventListener('click', addToCartModel)
    }

}
async function addToCartClicked(h,event) {
    event.preventDefault();
    let button = event.target
    let shopItem = document.getElementsByClassName('product-wrapper')[h]
    let productContent = shopItem.getElementsByClassName("product-content")[0]
    let productTitle = productContent.getElementsByClassName("product-title-3")[0]
    ///let h4 = shopItem.getElementsByClassName('product-item')[0]
    let title = productTitle.getElementsByTagName('h4')[0].innerText
    let span = productContent.getElementsByClassName('product-peice-addtocart')[0]
    let image = shopItem.getElementsByClassName('product-img')[0]
    let imageSrc = image.getElementsByTagName('img')[0].src
    let product = {
        "title" : title,
        "imageSrc" : imageSrc
    }
    addToCartNotif();
    document.getElementsByClassName("count-style")[0].innerText = sessionStorage.length
    if(sessionStorage.getItem(title)==null)
    {
        sessionStorage.setItem(title,JSON.stringify(product))
        console.log(sessionStorage.getItem(title))
        addItemToCart(title, imageSrc)
    }
    
}
function addToCartModel(event)
{
    event.preventDefault()
    var button = event.target
    var model = button.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
    console.log(model)
    var imageSrc = model.getElementsByClassName('tab-pane')[0].getElementsByTagName('img')[0].src
    var title = model.getElementsByClassName('qwick-view-content')[0].getElementsByTagName('h3')[0].innerText
    let product = {
        "title" : title,
        "imageSrc" : imageSrc
    }
    var alert = `
        <br>
        <div class="alert alert-success p-3" role="alert">
                Item added to cart
        </div>
    `
    let content = button.parentElement.parentElement
    let alertDiv = document.createElement('div')

    alertDiv.innerHTML = alert
    content.append(alertDiv)
    setTimeout(()=>content.getElementsByClassName("alert")[0].remove(),2000)
    document.getElementsByClassName("count-style")[0].innerText = sessionStorage.length
    if(sessionStorage.getItem(title)==null)
    {
        sessionStorage.setItem(title,JSON.stringify(product))
        console.log(sessionStorage.getItem(title))
        addItemToCart(title, imageSrc)
    }
}

    function addItemToCart(title, imageSrc) {
        document.getElementsByClassName("count-style")[0].innerText = sessionStorage.length
        var cartRow = document.createElement('li')
        cartRow.classList.add('single-product-cart')
        var cartItemContainer = document.getElementsByClassName('cart-content')[0]
        var cartUl = cartItemContainer.getElementsByTagName('ul')[0]
        var cartRowContents = `
            <div class="cart-img">
                <a href="#"><img src= "${imageSrc}" alt="" width = "80" height = "80"></a>
            </div>
            <div class="cart-title">
                <h3><a href="#"> ${title}</a></h3>
            </div>
            <div class="cart-delete">
                <a href="#"><i class="ti-trash"></i></a>
            </div> `
        cartRow.innerHTML = cartRowContents
        cartUl.append(cartRow)
        cartRow.getElementsByClassName('ti-trash')[0].addEventListener('click', removeCartItem)
    }

    function removeCartItem(event) {
        var buttonClicked = event.target
        var h = buttonClicked.parentElement.parentElement.parentElement.getElementsByClassName("cart-title")[0].getElementsByTagName("h3")[0].innerText
        sessionStorage.removeItem(h);
        buttonClicked.parentElement.parentElement.parentElement.remove()
        var cartItemContainer = document.getElementsByClassName('cart-content')[0]
        var cartUl = cartItemContainer.getElementsByTagName('ul')[0]
        var cartRows = cartUl.getElementsByTagName('li')
        document.getElementsByClassName("count-style")[0].innerText = sessionStorage.length
    }

    function addToCartNotif() {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }

