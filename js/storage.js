
function create_new_file(name){
  // get filelist obj from storage
  var obj = localStorage.getItem('filelist');
  var filelist = {}
  if(obj!=null){
    filelist = JSON.parse(obj);
  }
  // key value is unique
  key = Date.now()
  filelist[key] = name
  localStorage.setItem('filelist' , JSON.stringify(filelist));
  show_files();
}

function delete_file(file){
  // get filelist obj from storage
  var obj = localStorage.getItem('filelist');
  var filelist = {}
  if(obj!=null){
    filelist = JSON.parse(obj);
  }
  if(delete filelist[file]){
    localStorage.setItem('filelist' , JSON.stringify(filelist));
  }else{
    alert('delete error');
    return;
  }
  show_files();
}

function show_files(){
  // get filelist obj from storage
  var obj = localStorage.getItem('filelist');
  var filelist = {}
  if(obj!=null)
    filelist = JSON.parse(obj);
  var filenamearea = document.getElementById("files");
  filenamearea.removeChild(filenamearea.childNodes.item(0));
  const ul = document.createElement("ul");
  keylist = Object.keys(filelist)
  for(var key of keylist){
    const file_name = document.createTextNode(filelist[key]);
    const li = document.createElement("li");
    const anchor = document.createElement("a");
    const d_button  = document.createElement("input");
    anchor.text = filelist[key];
    anchor.href = "javascript:show_words(" + key + ")";
    d_button.value = "delete";
    d_button.type = "button";
    d_button.setAttribute('onclick', "delete_file('" + key + "')");
    li.appendChild(anchor);
    li.appendChild(d_button);
    ul.appendChild(li);
  }
  const li = document.createElement("li");
  const filename_input  = document.createElement("input");
  const a_button  = document.createElement("input");
  filename_input.id = "filename";
  filename_input.type="text";
  a_button.value = "add";
  a_button.type = "button";
  a_button.setAttribute('onclick', "create_new_file(document.getElementById('filename').value)");
  li.appendChild(filename_input);
  li.appendChild(a_button);
  ul.appendChild(li);
  filenamearea.appendChild(ul);
}

function show_words(file){
  // get filelist obj from storage
  var obj = localStorage.getItem(file);
  var wordslist = {}
  if(obj!=null)
  wordslist = JSON.parse(obj);
  var wordsarea = document.getElementById("words");
  wordsarea.removeChild(wordsarea.childNodes.item(0));
  const div = document.createElement("div");
  const filekey = document.createElement("input");
  filekey.id = "file_key";
  filekey.value = key;
  filekey.type = "hidden";
  div.appendChild(filekey);
  keylist = Object.keys(wordslist)
  for(var key of keylist){
    const t_word = document.createTextNode(key + " " + wordslist[key]);
    const li  = document.createElement("li");
    const s_button  = document.createElement("input");
    const d_button  = document.createElement("input");
    const w_span  = document.createElement("span");
    s_button.value = "sound";
    s_button.type = "button";
    s_button.setAttribute('onclick', "pronounce('" + key + "')");
    d_button.value = "delete";
    d_button.type = "button";
    d_button.setAttribute('onclick', "delete_word('" + file + "','" + key + "')");
    li.appendChild(t_word);
    li.appendChild(s_button);
    li.appendChild(d_button);
    div.appendChild(li);
  }
  const addwordarea = document.createElement("div");
  const word_input  = document.createElement("input");
  const meaning_input  = document.createElement("input");
  const add_button  = document.createElement("input");
  word_input.id = "new_word";
  meaning_input.id = "new_meaning";
  add_button.value = "add";
  add_button.type = "button";
  add_button.setAttribute('onclick', "add_word('" + file + "')");
  addwordarea.appendChild(word_input);
  addwordarea.appendChild(meaning_input);
  addwordarea.appendChild(add_button);
  div.appendChild(addwordarea);
  wordsarea.appendChild(div);
}

function add_word(file){
  var obj = localStorage.getItem(file);
  var wordslist = {}
  if(obj!=null)
    wordslist = JSON.parse(obj);
  word = document.getElementById("new_word").value;
  meaning = document.getElementById("new_meaning").value;
  if(word!=null&&meaning!=null){
    wordslist[word] = meaning;
    localStorage.setItem(file , JSON.stringify(wordslist));
  }else{
    alert('register error')
  }
  show_words(file);
}

function delete_word(file,word){
  var obj = localStorage.getItem(file);
  var wordslist = {}
  if(obj!=null){
    wordslist = JSON.parse(obj);
  }else{
    alert('delete error');
    return;
  }
  if(delete wordslist[word]){
    localStorage.setItem(file , JSON.stringify(wordslist));
  }else{
    alert('delete error2');
    return;
  }
  show_words(file);
}
