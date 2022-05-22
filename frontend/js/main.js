$.ajaxSetup({
    beforeSend: function beforeSend(xhr, settings) {
        function getCookie(name) {
            let cookieValue = null;


            if (document.cookie && document.cookie !== '') {
                const cookies = document.cookie.split(';');

                for (let i = 0; i < cookies.length; i += 1) {
                    const cookie = jQuery.trim(cookies[i]);

                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) === (`${name}=`)) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }

        if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
            // Only send the token to relative URLs i.e. locally.
            xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
        }
    },
});
$(document).on("click", ".js-add-image", function(e) {
    console.log("add")
    e.preventDefault()
    $(".js-toggle-model").toggleClass("hidden")
})

$(document).on("click", ".js-submit-post", function(e) {
    console.log("submit")
    
    e.preventDefault()
    $(".js-toggle-model").toggleClass("hidden")

    const $textarea = $(".js-input")

    value =$textarea.get(0).files.item(0).name
    if (!value.length) {
        return false
    }
    const $btn = $(this)
    return false
    $btn.prop("disabled", true).text("posting")
    $.ajax ({
        type:'POST',
        url:$textarea.data("post-url"),
        data:{
            image: value
        },
        success: (dataHtml) =>{
            $(".js-toggle-model").addClass("hidden");
            // $("#posts-container").prepend(dataHtml);
            $btn.prop("disabled", false).text("New Post");
            $textarea.val('');
        },
        error: (error) => {
            console.warn(error);
            $btn.prop("disabled",false).text("Error");
        }
    })

})


$(document).on("click", ".js-toggle-model-contact", function(e) {
   console.log("called")
   e.preventDefault()
   $(".js-modal ").toggleClass("hidden")
})

$(document).on("click", ".js-gallery", function(e) {
    console.log("gallery")
    e.preventDefault()
    const hash = this.hash
    $('html, body').animate({
        scrollTop: $(hash).offset().top
    }, 800)
});

$(document).on("click", ".js-submit", function(e) {
    console.log("submit")
    e.preventDefault()
    $(".js-modal ").toggleClass("hidden")
    const $btn = $(this)
    const $textarea = $(".js-text")
    const name = $(".js-name").val()
    const from = $(".js-name").val()
    const msg = $(".js-text").value
    $btn.prop("disabled", true).text("posting")
    $.ajax ({
        type:'POST',
        url:$textarea.data("post-url"),
        data:{
            name: name,
            from : from, 
            msg : msg,
        },
        success: (dataHtml) =>{
            // $(".js-toggle-model").addClass("hidden");
            // // $("#posts-container").prepend(dataHtml);
            // $btn.prop("disabled", false).text("New Post");
            $textarea.val('');
        },
        error: (error) => {
            // console.warn(error);
            // $btn.prop("disabled",false).text("Error");
        }
    })

})
