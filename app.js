var config = {
    from:"",

    to:"",

    content:"",

    patternId:0,

    colorId:0,

    isDark:false,
}

const waves = Array.from(document.getElementsByClassName("wavePaths"));
const patternHost = document.getElementById("patternHost");
const waveSVG = document.getElementById("waves")

function render() {
    const data = waveColors[config.colorId]
    const pattern = patternList[config.patternId]
    theme = config.isDark?"dark":"light";
  // Waves
  waves.forEach((x, i) => {
    x.style.fill = data.waveColors[i];
  });
  // Highlight Text
  document.body.style.setProperty("--highlight", data.waveColors[config.isDark?2:4]);
  // Background
  document.body.style.setProperty("--cardBg", backgroundColor[theme]);
  // Background
  document.body.style.setProperty("--textColor", textColor[theme]);
  // Pattern
  patternHost.classList.remove(...patternHost.classList)
  patternHost.classList.add("patternHost");
  patternHost.classList.add(pattern);
  patternHost.classList.remove("patternDark");
  waveSVG.classList.remove("wavesDark");
  if (theme == "dark") {
    patternHost.classList.add("patternDark");
    waveSVG.classList.add("wavesDark");
  }
}


const radioTemplate = document.getElementById('radioTemplate').content
const colorRadioHost = document.getElementById('colorRadios')

function buildRadio(c,i,cb,group){
    const node = radioTemplate.cloneNode(true).querySelector('div')
    console.log(node);
    node.querySelector('input').value = i
    if(i == 0){
        node.querySelector('input').checked = true
    }
    node.querySelector('input').id = group+i
    node.querySelector('input').name = group
    node.querySelector('label').htmlFor= group+i
    node.querySelector('span').style.setProperty('--bgc',c)
    node.addEventListener('change',cb)
    return node
}

function init(){
    for(let [i,c] of waveColors.entries()){
    node = buildRadio(c.waveColors[c.waveColors.length-1],i,()=>{config.colorId = i;render()},"color")
    colorRadioHost.append(
        node
      )
    }
    document.getElementById('modeRadios').append(buildRadio('#f1f1f1',0,()=>{config.isDark=false;render()},"mode"))
    document.getElementById('modeRadios').append(buildRadio('#121214',1,()=>{config.isDark=true;render()},"mode"))

    for(const [i,c] of patternList.entries()){
        document.getElementById('patternRadios').append( buildRadio('#323252',i,()=>{config.patternId=i;render()},"pattern"))
    }
}
init()

const cfrom = document.getElementById("cardFrom")
document.getElementById("configFrom").addEventListener('input',(e)=>{
    cfrom.innerText = e.target.value
})
cfrom.innerText = document.getElementById("configFrom").value

const cto = document.getElementById("cardTo")
document.getElementById("configTo").addEventListener('input',(e)=>{
    cto.innerText = e.target.value
})
cto.innerText = document.getElementById("configTo").value

const ccontent = document.getElementById("cardContent")
document.getElementById("configContent").addEventListener('input',(e)=>{
    ccontent.innerHTML = marked.parse(e.target.value)
})
ccontent.innerHTML = marked.parse(document.getElementById("configContent").value)

document.getElementById("patternOpacity").addEventListener('input',(e)=>{
    document.body.style.setProperty("--patternOpacity", e.target.value);
})
document.body.style.setProperty("--patternOpacity", document.getElementById("patternOpacity").value);

render()


document.getElementById("downloadButton").addEventListener("click", function() {
    document.getElementById('configurator').style.display = 'none'
	html2canvas(document.getElementById("card"),{useCORS: true,allowTaint:true}).then(function (canvas) {			
        var anchorTag = document.createElement("a");
			document.body.appendChild(anchorTag);
			anchorTag.download = "card.jpg";
			anchorTag.href = canvas.toDataURL();
			anchorTag.target = '_blank';
			anchorTag.click();
		});
        document.getElementById('configurator').style.display = 'block'
 });