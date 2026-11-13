/* Small touches shared by every page: fade-in on scroll, menu border on scroll, chart frames that fit their chart */
(function () {
  var bar = document.querySelector('.topbar');
  function onScroll() { if (bar) bar.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, {passive: true}); onScroll();

  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {rootMargin: '0px 0px -8% 0px', threshold: 0.08});
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  document.querySelectorAll('.chart-frame').forEach(function (f) {
    function fit() { try { var h = f.contentDocument.body.scrollHeight; if (h > 300) f.style.height = (h + 4) + 'px'; } catch (e) {} }
    function watch() { fit(); try { new ResizeObserver(fit).observe(f.contentDocument.body); } catch (e) {} }
    f.addEventListener('load', watch);
    if (f.contentDocument && f.contentDocument.readyState === 'complete' && f.contentDocument.body && f.contentDocument.body.childElementCount) watch();
  });
})();
