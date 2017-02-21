function toggle_preview_journalists() {
    var show = preview_journalists.checked;
    localStorage.rotter_sanity_preview_journalists = show;
    for (var i = 0; i < comments.length; i++) {
        var comment = comments[i];
        if (!show) {
            comment.innerText = '..................';
        } else {
            var user_icon = comment.parentElement.parentElement.querySelector('td:nth-child(2) > font > img');
            if (user_icon && user_icon.src.indexOf('report_icon') > 0) {
                var preview = comment.getAttribute('title');
                comment.innerText = preview;
            }
        }

    }
}

var comments_section = document.querySelector('body > div:nth-child(3) > font > center');
comments_section.style.display = 'none';
var comments_preview = document.querySelector('body > div:nth-child(3) > font > center > table:nth-child(1)').cloneNode(true);
var comments = comments_preview.querySelectorAll('tbody > tr:nth-child(n+2) > td:nth-child(1) > font');
for (var i = 0; i < comments.length; i++) {
    var comment = comments[i];
    var preview = comment.innerText;
    comment.innerText = '..................';
    comment.setAttribute('title', preview);
}
var show_comments_btn = document.createElement('button');
show_comments_btn.setAttribute('id', 'rotter_sanity_show_comments')
show_comments_btn.innerText = 'Show comments';
show_comments_btn.onclick = function() {
    comments_preview.style.display = 'none';
    show_comments_btn.style.display = 'none';
    comments_section.style.display = 'block';
}
var comments_header = comments_preview.querySelector('tbody > tr:nth-child(1) > th:nth-child(1)');
var preview_journalists = document.createElement('input');
preview_journalists.setAttribute('type', 'checkbox');
preview_journalists.checked = localStorage.rotter_sanity_preview_journalists == 'true';
preview_journalists.onchange = toggle_preview_journalists;
var preview_journalists_label = document.createElement('label');
preview_journalists_label.innerText = 'הצג רק "עיתונאים"';
comments_header.classList.add('rotter_sanity_options');
toggle_preview_journalists();
comments_header.innerHTML = '';
comments_header.appendChild(preview_journalists);
comments_header.appendChild(preview_journalists_label);
comments_section.parentElement.appendChild(show_comments_btn);
comments_section.parentElement.appendChild(comments_preview);
