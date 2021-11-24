const balance_modal = document.getElementById('balance_modal');
const user_menu = document.getElementById('user_menu');

function openBalModal(){
    balance_modal.classList.remove('hidden');
}

function closeBalModal(){
    balance_modal.classList.add('hidden');
}

function userMenu(){
    if(user_menu.classList.contains('hidden')){
        user_menu.classList.remove('hidden');
    }else{
        user_menu.classList.add('hidden');
    }
    
}
