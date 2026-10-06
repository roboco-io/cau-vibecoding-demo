'use strict';
// 화면 설명용 가상 데이터. 실제 선수·경기·DB·API를 사용하지 않습니다.
const pitches = [
  {pa:1,n:1,p:101,b:201,type:'직구',speed:146.2},
  {pa:1,n:2,p:101,b:201,type:'슬라이더',speed:132.8},
  {pa:2,n:1,p:101,b:201,type:'직구',speed:147.1},
  {pa:2,n:2,p:101,b:202,type:'커브',speed:121.4},
  {pa:3,n:1,p:102,b:201,type:'직구',speed:144.6},
  {pa:3,n:2,p:102,b:201,type:'체인지업',speed:130.5}
];
const issues = {
  missing:{title:'필수 선수 ID 누락',code:'REQUIRED_MISSING',row:'입력 7행',field:'pitcher',value:'빈 값',outcome:'격리 · DB에 저장하지 않는 예시',action:'원본의 투수 식별자를 확인합니다. 이름이나 임의 번호로 채우지 않습니다.'},
  conflict:{title:'기존 기록과 내용 충돌',code:'CONTENT_CONFLICT',row:'입력 8행',field:'release_speed',value:'기존 91.0 mph / 입력 94.0 mph (가상)',outcome:'격리 · 기존 값을 유지하는 예시',action:'출처·변경 이유를 확인합니다. 새로운 입력이라는 이유만으로 기존 값을 덮어쓰지 않습니다.'},
  mapping:{title:'선수 매핑 미해결',code:'PLAYER_UNRESOLVED',row:'입력 4행',field:'batter',value:'MLBAM ID 202 (가상)',outcome:'경고 · ID만 저장하는 예시',action:'선수 자료의 ID와 버전을 확인합니다. 동명이인과 잘못 연결하지 않도록 이름으로 추정하지 않습니다.'}
};
const form=document.querySelector('#filters');
function render(){
  const game=document.querySelector('#game').value;
  const p=document.querySelector('#pitcher').value;
  const b=document.querySelector('#batter').value;
  const rows=game==='empty'?[]:pitches.filter(r=>(p==='all'||r.p===Number(p))&&(b==='all'||r.b===Number(b)));
  document.querySelector('#pitch-rows').innerHTML=rows.map(r=>`<tr><td>${r.pa} / ${r.n}</td><td>데모 투수 ${r.p}</td><td>${r.b===202?'미연결 선수 202':`데모 타자 ${r.b}`}</td><td>${r.type}</td><td>${r.speed.toFixed(1)}</td><td><span class="status ${r.b===202?'warn':'good'}">${r.b===202?'선수 미연결':'정상 예시'}</span></td></tr>`).join('');
  document.querySelector('#result-count').textContent=`가상 기록 ${rows.length}건`;
  document.querySelector('#empty-state').hidden=rows.length!==0;
}
function showIssue(key){
  const i=issues[key];
  document.querySelector('#issue-detail').innerHTML=`<p class="code">${i.code} · 가상 사례</p><h3>${i.title}</h3><dl><dt>원본 위치</dt><dd>${i.row}</dd><dt>대상 항목</dt><dd>${i.field}</dd><dt>입력 값</dt><dd>${i.value}</dd><dt>처리 상태</dt><dd>${i.outcome}</dd></dl><p class="action"><strong>다음 확인</strong><br>${i.action}</p>`;
  document.querySelectorAll('[data-issue]').forEach(btn=>{const selected=btn.dataset.issue===key;btn.classList.toggle('active',selected);btn.setAttribute('aria-pressed',String(selected));});
}
form.addEventListener('submit',e=>{e.preventDefault();render();});
document.querySelector('#reset-filters').addEventListener('click',()=>{form.reset();render();});
document.querySelectorAll('[data-issue]').forEach(btn=>btn.addEventListener('click',()=>showIssue(btn.dataset.issue)));
render();showIssue('missing');
