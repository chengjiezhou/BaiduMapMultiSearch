var template_request_body = `

    <div style='position:absolute;top:0px;right:0px;z-index:9;text-align:center;'><div id="info_title" style='background-color: #fff;height: 30px;padding-left: 10px;font-size: 16px;'></div><textarea id='define_textarea' style='width:300px;height:200px;display:inherit;'></textarea><button id='pre_btn' style='width:80px;height:80px;border-radius: 80px;color:#fff;background-color:#2e77e5;font-size:16px;line-height:80px;border:none;float:left;'>上一个</button><button id='refresh_btn' style='width:80px;height:80px;border-radius: 80px;color:#fff;background-color:#d5ca4f;font-size:16px;line-height:80px;border:none;'>刷新</button><button id='next_btn' style='width:80px;height:80px;border-radius: 80px;color:#fff;background-color:#2e77e5;font-size:16px;line-height:80px;border:none;float:right;'>下一个</button></div>
`;

var address_arr = new Array();
var address_index = -1, address_arr_len = 0;

function input_template () {
    let alert_area = document.querySelector("#app");
    let popup = document.createElement("div");
    popup.innerHTML = template_request_body;
    alert_area.appendChild(popup);

}

function pre() {
  if(address_arr_len < 1)
    return false;

  address_index--;
  address_index = address_index < 0 ? 0: address_index;
  goSearch(address_index);
}

function next() {
  if(address_arr_len < 1)
    return false;

  address_index++;
  address_index = address_index >= address_arr_len ? (address_arr_len-1) : address_index;
  goSearch(address_index);
}

function refresh() {
    goSearch(address_index);
}

function goSearch(index) {
  var address = address_arr[index];
  goDone(address);
  document.getElementById('info_title').innerHTML = '共计：<b>'+ address_arr_len +'</b>个地址；当前是第<b>'+ (index+1) +'</b>个地址';
}

function goDone(address) {
  document.getElementById('sole-input').value=address
  document.getElementById('search-button').click()
}

function listen_button () { 
    var pre_btn = document.getElementById("pre_btn");
    var next_btn = document.getElementById("next_btn");
    var refresh_btn = document.getElementById("refresh_btn");
    var text_area = document.getElementById("define_textarea");

    pre_btn.addEventListener('click', function() {
        pre();
    });

    next_btn.addEventListener('click', function() {
        next();
    });

    refresh_btn.addEventListener('click', function() {
        refresh();
    });

    text_area.addEventListener('change', function() {
        var textarea_val = this.value;
        address_arr = textarea_val.split('\n');
        address_arr_len = address_arr.length;
    });
};

input_template();

listen_button();

