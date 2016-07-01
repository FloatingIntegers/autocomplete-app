// globals OriDomi
const folded = new OriDomi('#origami', {
  hPanels : 10,
  ripple : true,
  shading : 'hard',
  speed : 1000,
});
folded.collapse('top');
document.getElementById('button-fold').addEventListener('click', () => {
  folded.reveal('top');
});
