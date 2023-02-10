/*
 * == PipeJs ==
 * JS Terminal
 */

(function(){
  if (document.getElementById("pipejs_window")) {
    pipejs.window.remove();
    (function(){pipejs = document.createElement("script");pipejs.src="https://chezmarklets--chezcoder.repl.co/scripts/pipe.js";document.body.appendChild(pipejs)}());
  }
  const version = "0.9.0";
  const jversion = "5";
  const year = new Date().getFullYear();
  var documentEl = document.body.parentElement;
  var bodyEl = document.body;
  var pipejs = {
    "window": "",
    "drag": "",
    "editor": "",
    "editorPrompt": "",
    "editorStdout": "",
    "std": {
      "stdhist": [""],
      "stdhist_pointer": 0,
      "output": ""
    }
  };

  // try{
  //   $;
  // } catch(e) {
  //   let jquery = document.createElement("script");
  //   jquery.src = "https://code.jquery.com/jquery-3.4.1.min.js";
  //   document.body.parentElement.appendChild(jquery);
  // }

  function sanitize(arg) {
    try {
      return(arg.replace(/\</g,"&lt;").replace(/\>/g,"&gt;").replace(/\ /g,"&nbsp;"));
    } catch {
      return arg;
    }
  }
  pipejs.window = document.createElement("div");
  pipejs.window.id = "pipejs_window";
  // pipejs.window.style = "background:rgba(0,0,0,75%);width:200px;height:250px;border-radius:10px;padding:10px;resize:both;color:rgb(0,255,0);font-family:monospace;font-weight:bold;font-size:15px;overflow-x:scroll;white-space:nowrap;outline:none;cursor:text;padding-top:0px;"
  pipejs.window.style = "background:rgba(0,0,0,75%);width:500px;height:99%;padding:10px;resize:both;color:rgb(0,255,0);font-family:monospace;font-weight:bold;font-size:15px;overflow-x:scroll;white-space:nowrap;outline:none;cursor:text;padding-top:0px;position:fixed;right:0px;top:0px;z-index:100000;";
  pipejs.window.addEventListener("mouseup",function(){
    document.getElementById("pipejs_editor_prompt").focus();
  });

  pipejs.editor = document.createElement("div");
  pipejs.editor.id = "pipejs_editor";

  pipejs.editorStdout = document.createElement("div");
  pipejs.editorStdout.id = "pipejs_editor_stdout";
  pipejs.editorStdout.innerHTML = `PipeJs v${version} | SafeSchool Terminal<br>JavaScript v${jversion}<br><span style=\"color:orange;background:transparent;\">&gt; </span> `;
  pipejs.editorStdout.style = "background:transparent;color:rgb(0,255,0);font-family:monospace;font-weight:bold;font-size:15px;display:inline;";

  pipejs.editorPrompt = document.createElement("input");
  pipejs.editorPrompt.id = "pipejs_editor_prompt";
  pipejs.editorPrompt.style = "background:transparent;border:none;font-size:15px;color:rgb(255,255,255);font-weight:bold;font-family:monospace;outline:none;margin:0px;padding:0px;";
  pipejs.editorPrompt.size = "50";
  pipejs.editorPrompt.onkeypress = onkeypress="this.style.width = ((this.value.length + 1) * 15) + 'px';"
  pipejs.editorPrompt.addEventListener("keydown",function(e) {
    if (e.key == "ArrowUp") {
      if (pipejs.std.stdhist_pointer !== 0 && pipejs.std.stdhist) {
        pipejs.std.stdhist_pointer--;
      }
      this.value = pipejs.std.stdhist[pipejs.std.stdhist_pointer];
    } else if (e.key == "ArrowDown") {
      if (pipejs.std.stdhist_pointer != pipejs.std.stdhist.length - 1 && pipejs.std.stdhist) {
        pipejs.std.stdhist_pointer++;
      }
      this.value = pipejs.std.stdhist[pipejs.std.stdhist_pointer];
    } else if (e.key == "Enter") {
      if (pipejs.std.stdhist[pipejs.std.stdhist.length - 1] != this.value && this.value != "") {
        pipejs.std.stdhist.push(this.value);
      }

      execute(this);

      pipejs.std.stdhist_pointer = pipejs.std.stdhist.length;
      this.value = "";

      console.stdout(pipejs.std.stdhist);
      this.scrollTop = this.scrollHeight
    } else {
      pipejs.std.stdhist_pointer = pipejs.std.stdhist.length;
    }
  });

  pipejs.drag = document.createElement("div");
  pipejs.drag.id = "pipejs_drag";
  pipejs.drag.style = "background:gray;width:calc(100%+20px);height:15px;padding:0px;margin-left:-10px;margin-right:-10px;cursor:grab;"
  pipejs.drag.addEventListener("mousedown",function(e){
    e.target.style.cursor = "grabbing";
  });
  pipejs.drag.addEventListener("mouseup",function(e){
    e.target.style.cursor = "grab";
  });

  let close = document.createElement("div");
  close.innerHTML = "&times;";
  close.style = "background:transparent;color:red;position:absolute;cursor:pointer;";
  close.addEventListener("mouseup",function(){
    document.getElementById("pipejs_window").remove();
  });

  pipejs.editor.appendChild(pipejs.editorStdout);
  pipejs.editor.appendChild(pipejs.editorPrompt);
  
  pipejs.window.appendChild(close);
  pipejs.window.appendChild(pipejs.drag);
  pipejs.window.appendChild(pipejs.editor);

  let dragimg = document.createElement("img");
  dragimg.src = "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-drag-512.png";
  dragimg.style = "width:10px;";

  documentEl.appendChild(pipejs.window);

  function execute(e) {

    let val = e.value;

    console.log = function(log) {
      pipejs.std.output = "<span style=\"font-family:monospace;background:transparent;color:white;\"> " + log + "</span>";
      console.dir(log);
    }

    console.warn = function(log) {
      pipejs.std.output = "<span style=\"font-family:monospace;background:transparent;color:yellow;\">" + log + "</span>";
      console.dir(log);
    }

    console.error = function(log) {
      pipejs.std.output = "<span style=\"font-family:monospace;background:transparent;color:red;\">" + log + "</span>";
      console.dir(log);
    }

    console.info = function(log) {
      pipejs.std.output = "<span style=\"font-family:monospace;background:transparent;color:deepskyblue;\">" + log + "</span>";
      console.dir(log);
    }

    console.debug = function(log) {
      pipejs.std.output = "<span style=\"font-family:monospace;background:transparent;color:green;\">" + log + "</span>";
      console.dir(log);
    }

    console.trace = function(log) {
      pipejs.std.output = "<span style=\"font-family:monospace;background:transparent;color:red;\">" + log + "</span>";
    }


    try {
      eval(val);
    } catch (e) {
      pipejs.std.output = "<span style=\"font-family:monospace;background:transparent;color:red;\">" + e + "</span>";
    }

    // pipejs.std.output = "<span style=\"color:red;\">test</span>";

    pipejs.editorStdout.innerHTML = pipejs.editorStdout.innerHTML.split("<!--pipejs_seperator-->")[0] + " <span style=\"background:transparent;color:white;font-family:monospace;\">" + sanitize(val) + "</span><br>" + "<span style=\"font-family:monospace;\">" + pipejs.std.output + "</span><br><span style=\"color:orange;background:transparent;font-family:monospace;\">&gt; </span> ";
    pipejs.std.output = "";
  }
}());
