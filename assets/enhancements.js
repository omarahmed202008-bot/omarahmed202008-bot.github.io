/* No external tracking, no network requests, no source poster assets. */
(function(){
'use strict';
const records=[
 {title:'Adaptive World Models',url:'/projects/adaptive-world-models.html',terms:'AI uncertainty planning research world models'},
 {title:'Agrifusion 2.0',url:'/projects/agrifusion.html',terms:'AI agriculture plant stress sensor fusion'},
 {title:'CO₂ Eater',url:'/projects/co2-capture.html',terms:'carbon capture microalgae mineral MPC'},
 {title:'Luminex',url:'/projects/luminex.html',terms:'optical spectrophotometer absorbance e waste'},
 {title:'Smart Greenhouse',url:'/projects/smart-greenhouse.html',terms:'ESP32 climate IoT rule based feedback'},
 {title:'TensiQ AI',url:'/projects/tensiq-ai.html',terms:'yarn tension industrial AI control'},
 {title:'Leadership and Activities',url:'/#leadership',terms:'YFV MUN student union education'},
 {title:'Honors and Awards',url:'/#honors',terms:'purple comet ISEF EISTF'},
 {title:'Academic CV',url:'/cv.html',terms:'resume curriculum vitae pdf'},
 {title:'Contact',url:'/#contact',terms:'email phone'}
];
const htmlEscape=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function commandPalette(){
 let overlay=document.getElementById('cmd-overlay');
 if(overlay)return;
 overlay=document.createElement('div');overlay.id='cmd-overlay';overlay.hidden=true;
 overlay.innerHTML='<div class="cmd-panel" role="dialog" aria-modal="true" aria-label="Search the portfolio"><h2>Search the academic portfolio</h2><input type="search" class="cmd-search" id="cmd-input" aria-label="Search projects and pages" placeholder="Search projects, leadership, awards..." autocomplete="off"><div class="cmd-results" id="cmd-results"></div><div class="cmd-footer"><span>↑ ↓ Navigate · Enter Open · Esc Close</span><button type="button" id="cmd-close">Close</button></div></div>';
 document.body.appendChild(overlay);
 let previousFocus=null;
 const field=overlay.querySelector('#cmd-input'),results=overlay.querySelector('#cmd-results');
 const render=()=>{
  const query=field.value.trim().toLowerCase();
  const matches=records.filter(r=>(r.title+' '+r.terms).toLowerCase().includes(query));
  results.innerHTML=matches.length?matches.map(r=>'<a href="'+r.url+'">'+htmlEscape(r.title)+'</a>').join(''):'<p>No matching pages.</p>';
 };
 const open=()=>{previousFocus=document.activeElement;overlay.hidden=false;field.value='';render();field.focus()};
 const close=()=>{overlay.hidden=true;previousFocus?.focus?.()};
 document.addEventListener('keydown',e=>{
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();overlay.hidden?open():close()}
  if(overlay.hidden)return;
  if(e.key==='Escape'){e.preventDefault();close()}
  if(e.key==='ArrowDown'&&document.activeElement===field){e.preventDefault();results.querySelector('a')?.focus()}
  if(e.key==='ArrowDown'&&document.activeElement.closest('.cmd-results')){e.preventDefault();(document.activeElement.nextElementSibling||results.querySelector('a'))?.focus()}
  if(e.key==='ArrowUp'&&document.activeElement.closest('.cmd-results')){e.preventDefault();(document.activeElement.previousElementSibling||field)?.focus()}
 });
 overlay.querySelector('#cmd-close').addEventListener('click',close);
 overlay.addEventListener('click',e=>{if(e.target===overlay)close()});
 field.addEventListener('input',render);
 render();
 const control=document.createElement('button');control.className='action-pill';control.type='button';control.textContent='⌕ Search portfolio (Ctrl + K)';control.addEventListener('click',open);
 const host=document.querySelector('.quick-actions')||document.querySelector('.hero-actions');if(host)host.appendChild(control);
}
function bindCitation(){
 const button=document.querySelector('[data-citation-copy]');
 if(!button)return;
 const title=document.querySelector('h1')?.textContent?.trim()||'Research case study';
 const cite='Abdullah, O. A. (2026). '+title+'. Academic research portfolio. '+location.href.split('#')[0]+' (Student research summary; status as disclosed on page).';
 button.addEventListener('click',async()=>{
   try{await navigator.clipboard.writeText(cite);button.textContent='Citation copied ✓'}
   catch(e){const area=document.createElement('textarea');area.value=cite;document.body.appendChild(area);area.select();document.execCommand('copy');area.remove();button.textContent='Citation copied ✓'}
   setTimeout(()=>button.textContent='Copy citation',2500)
 });
 const dl=document.querySelector('[data-download-summary]');
 if(dl)dl.addEventListener('click',()=>{
  const sections=[...document.querySelectorAll('.content section')].map(s=>s.querySelector('h2')?.textContent+'\n'+s.innerText.trim()).join('\n\n');
  const text='Research Portfolio — '+title+'\n'+location.href+'\n\n'+document.querySelector('.intro')?.innerText+'\n\n'+sections+'\n\nNote: Source-reported results are not independently verified. Original posters are intentionally excluded.';
  const blob=new Blob([text],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download='research-summary-'+(document.body.dataset.project||'project')+'.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)
 });
 const printer=document.querySelector('[data-print-project]');printer?.addEventListener('click',()=>window.print());
}
const architecture={
 'adaptive-world-models':[['State observations','The controller observes a synthetic navigation state and the executed transition.'],['Model ensemble','Five neural transition models estimate categorical movement outcomes.'],['Change evidence','Predictive disagreement, observed surprise and sequential evidence are compared.'],['Planning horizon','A fixed or adaptive lookahead horizon controls the amount of planning work.'],['Evaluation','Reward, goal counts, model TV distance and work are evaluated after dynamics shift.']],
 'agrifusion':[['Sensors','Soil moisture, temperature/humidity, broad gas-response sensors and leaf imagery.'],['Signal conditioning','Calibrate sensor readings and construct synchronized feature windows.'],['Multimodal fusion','Tabular features and image embeddings contribute complementary information.'],['Prediction','Classification and 6–12-hour stress forecasts are investigated.'],['Irrigation','Thresholded predicted risk informs closed-loop intervention, subject to validation.']],
 'co2-capture':[['Intake','CO₂-containing air is driven into the bottom of the reactor.'],['Mineral capture','Ca(OH)₂ chemically captures a proportion of the incoming gas.'],['Algae chamber','Upper microalgal culture fixes carbon using light and biological growth.'],['Sensor feedback','CO₂, temperature and illumination signals inform the controller.'],['MPC','A predictive strategy modifies pump PWM and light intensity to manage efficiency.']],
 'luminex':[['RGB light','Select a visible LED color and stabilize the light path.'],['Cuvette','Pass light through a blank or dye sample.'],['Photodiode','Convert transmitted light intensity into a photocurrent.'],['LM358 TIA','Amplify photocurrent for ADC measurement.'],['Absorbance','Calculate A = −log₁₀(I/I₀) and compare concentrations.']],
 'smart-greenhouse':[['Measure','ESP32-S3 reads soil moisture, light and climate conditions.'],['Compare','Apply crop-specific rule-based thresholds.'],['Actuate','Turn on zone pumps, fans or lighting based on control rules.'],['Monitor','INA219 checks power signatures for potential actuator faults.'],['Log','Record measurements and actions through SD and telemetry.']],
 'tensiq-ai':[['Yarn path','Supply spool passes yarn through a tension-sensitive pulley.'],['Sense','Load cell/HX711 and encoder supply tension and RPM signals.'],['Features','Construct tension, derivative and speed features.'],['Predict','Compact edge classifier estimates incoming instability.'],['Correct','Bounded PWM slowdown aims to mitigate spikes; break sensor remains independent.']]
};
function drawArchitecture(){
 const slug=document.body.dataset.project;const steps=architecture[slug];
 const target=document.querySelector('[data-architecture]');if(!target||!steps)return;
 const buttons=document.createElement('div');buttons.className='arch-steps';
 const detail=document.createElement('div');detail.className='arch-detail';detail.setAttribute('role','status');detail.setAttribute('aria-live','polite');
 function select(i){buttons.querySelectorAll('button').forEach((b,j)=>b.setAttribute('aria-pressed',String(i===j)));detail.innerHTML='<strong>'+htmlEscape(steps[i][0])+'</strong><span>'+htmlEscape(steps[i][1])+'</span>'}
 for(let i=0;i<steps.length;i++){const b=document.createElement('button');b.type='button';b.textContent=(i+1)+'. '+steps[i][0];b.addEventListener('click',()=>select(i));buttons.appendChild(b)}
 target.append(buttons,detail);select(0)
}
const charts={
 'adaptive-world-models':{title:'Global-shift post-change reward (higher is better)',note:'Values transcribed from the manuscript; illustrative bar rendering of reported averages, not a reanalysis of trial data.',max:0.125,values:[['Evidence-guided',0.078],['Fixed H12',0.112]],unit:''},
 'co2-capture':{title:'Peak CO₂ capture efficiency (%)',note:'Poster-reported values. Raw experiment logs unavailable; displayed 20.8-point difference does not reconcile with poster label +21.9%.',max:100,values:[['Fixed',71.5],['Adaptive',92.3]],unit:'%'},
 'agrifusion':{title:'Poster-reported overall classification F1 (%)',note:'Aggregate model metrics from source poster; validation partition and raw records were not provided.',max:100,values:[['Overall F1',96.6],['Healthy',99.0],['Water stress',95.8],['Disease risk',95.1]],unit:'%'},
 'luminex':{title:'Reported calibration properties',note:'Poster-reported R² and repeatability; no reconstructed raw absorbance calibration points.',max:100,values:[['R² × 100',98],['Accuracy at 50% standard',98]],unit:'%'},
 'smart-greenhouse':{title:'Source-reported recovery intervals (seconds)',note:'Thermal spike and soil-moisture recovery are different physical processes, not a direct efficiency comparison.',max:300,values:[['Thermal recovery',71],['Soil-moisture recovery',270]],unit:' s'},
 'tensiq-ai':{title:'Planned thresholds, NOT experimental results (%)',note:'Targets from technical presentation; should not be interpreted as measured model accuracy or reduction.',max:100,values:[['Classification target',85],['Break-detection target',95],['Tension-spike reduction target',25]],unit:'%'}
};
function drawChart(){
 const data=charts[document.body.dataset.project],target=document.querySelector('[data-chart]');
 if(!data||!target)return;
 target.innerHTML='<h3>'+htmlEscape(data.title)+'</h3><div class="data-bars"></div><p class="data-note">'+htmlEscape(data.note)+'</p>';
 const bars=target.querySelector('.data-bars');
 for(let i=0;i<data.values.length;i++){const [label,value]=data.values[i];const item=document.createElement('div');item.innerHTML='<div class="data-bar-label"><span>'+htmlEscape(label)+'</span><span>'+value+htmlEscape(data.unit)+'</span></div><div class="bar-track"><div class="bar-fill '+(i%2?'alt':'')+'" style="width:'+Math.min(100,Math.max(0,value/data.max*100))+'%"></div></div>';bars.appendChild(item)}
}
function demo(){
 const target=document.querySelector('[data-demo]');if(!target)return;
 const id=document.body.dataset.project;
 const labels={
  'adaptive-world-models':{label:'Planning horizon',min:2,max:12,value:6,step:1,unit:' steps',kind:'linear'},
  'co2-capture':{label:'Inlet CO₂ concentration',min:400,max:2000,value:800,step:50,unit:' ppm',kind:'co2'},
  'agrifusion':{label:'Illustrative stress probability',min:0,max:100,value:50,step:5,unit:'%',kind:'threshold'},
  'luminex':{label:'Transmitted light fraction',min:10,max:100,value:60,step:5,unit:'%',kind:'absorbance'},
  'smart-greenhouse':{label:'Soil moisture',min:0,max:100,value:35,step:5,unit:'%',kind:'soil'},
  'tensiq-ai':{label:'Illustrative tension reading',min:0,max:100,value:40,step:5,unit:'%',kind:'tension'}
 };
 const d=labels[id];if(!d)return;
 target.innerHTML='<h3>Explore the principle</h3><label class="data-bar-label" for="demo-range"><span>'+d.label+'</span><strong data-demo-value></strong></label><input type="range" id="demo-range" min="'+d.min+'" max="'+d.max+'" value="'+d.value+'" step="'+d.step+'"><div class="demo-output" aria-live="polite"></div><p class="data-note"><strong>Educational simulation only.</strong> This control uses illustrative assumptions to explain a concept. It does not predict real experimental outcomes, reproduce a trained model, or constitute evidence for the project.</p>';
 const range=target.querySelector('input'),v=target.querySelector('[data-demo-value]'),out=target.querySelector('.demo-output');
 const card=(n,t)=>'<div><strong>'+n+'</strong><span>'+t+'</span></div>';
 function render(){
 const x=Number(range.value);v.textContent=x+d.unit;
 let content='';
 if(d.kind==='linear')content=card(x,'Steps evaluated in example')+card(Math.round(100*x/12)+'%','Relative horizon depth vs H12 (linear illustration)');
 if(d.kind==='co2'){const outlet=x*0.65;content=card(Math.round(outlet)+' ppm','Illustrative outlet (35% removal assumed)')+card('35%','Assumed fractional removal')};
 if(d.kind==='threshold')content=card(x>=70?'Intervention suggested':'Monitor / observe','Illustrative threshold: risk ≥70%')+card(x+'%','Hypothetical estimated risk');
 if(d.kind==='absorbance'){const a=-Math.log10(x/100);content=card(a.toFixed(3),'Absorbance: −log₁₀(T)')+card((x/100).toFixed(2),'Transmittance ratio T=I/I₀')};
 if(d.kind==='soil')content=card(x<20?'Pump ON':x>40?'Pump OFF':'Within target band','Illustrative soil control')+card('20–40%','Example rule-based band');
 if(d.kind==='tension')content=card(x>=70?'Reduce speed':'Normal operation','Illustrative threshold: 70 units')+card(x+'/100','Arbitrary demonstration scale');
 out.innerHTML=content
 }
 range.addEventListener('input',render);render()
}
document.addEventListener('DOMContentLoaded',()=>{commandPalette();bindCitation();drawArchitecture();drawChart();demo()});
})();