document.querySelector('body').addEventListener('click', run)
document.querySelector('#writingLink').addEventListener('click', showWriting)
document.querySelector('button').addEventListener('click', showMain)

function run() {

    document.querySelector("#mainText").classList.toggle('hidden');
    

    //i can't toggle the visibility of the name off
    //document.querySelector('div').innerText = "HELLO"

    //document.getElementById("contentText").style-display = 'block';
    //document.getElementById("div").style.display = "none"
  }

function showWriting() {
    document.querySelector("#writingList").classList.toggle('hidden');
    document.getElementById("mainText").style.display = 'none'
    document.getElementById("name").style.display = 'none'

}

function showMain() {
  document.getElementById("mainText").style.display = 'block'
  document.querySelector("#writingList").classList.toggle('hidden');
}
