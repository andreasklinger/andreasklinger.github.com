var fs = require('fs'),
    http = require('http');


var path = process.argv[2] || "/tumblr";
if (path[0] != "/") path = "/" + path
if (path[path.length -1] == "/") path = path.slice(0,-1)



http.createServer(function (req, res) {

  if (req.url[0] != "/") req.url = "/" + req.url;
  if (req.url[req.url.length - 1] == "/") req.url = req.url + "index.html";

  fs.readFile(__dirname + path + req.url, function (err,data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }

    var filetype = req.url.slice(req.url.lastIndexOf(".") + 1, req.url.length);

    res.writeHead(200, {'Content-Type': 'text/' + filetype });
    res.end(parseTumblrTags(data));
  });
}).listen(3000);

console.log("Server fetching from " + __dirname + path);

function parseTumblrTags(data) {
  var tags = {
    'description': 'Startup Entrepreneur and Mentor.<br/>\nI am what people call "a product guy".<br/>\nI try to help startups.\n',
    'title': 'Why the future needs a brandname.',
    'dayofmonth': '3',
    'dayofmonthsuffix': 'rd',
    'month': 'January',
    'shortyear': '13',
    'year': '2013',
    'tagurl': '#',
    'favicon': '#',
    'previouspage': '#',
    'nextpage': '#',
    'metadescription': 'I am @andreasklinger. I am Co-founder of LOOKK. I am what people call &quot;a product guy&quot; and try to share here what actually worked for me.',
    'tag': 'entrepreneurs innovation singularity university kurzweil musk',
    'permalink': 'http://klinger.io/post/39650373908/why-the-future-needs-a-brandname',
    'body': '  <p><img src="http://media.tumblr.com/00a6368730b08ebeda85674c365167b9/tumblr_inline_mfzr96CFrO1r5v9i8.jpg" alt=""/></p>\n\n<p><strong>There is a disenchantment in our generation.</strong> We are still sitting on our lonely planet <strong>without space travel nor flying cars or at least hover boards</strong>. We are locked to the ground of technological advancement.</p>\n\n<p>Although the Internet is a generation defining technological advancement, it feels like it&#8217;s <a href="http://pandodaily.com/2013/01/03/why-silicon-valley-innovation-has-stalled/">stalled</a>, to some even <a href="http://techcrunch.com/2012/12/30/im-bored-whats-next/">boring</a>. Trapped in constant mental incest some say it became a bit repetitive, driven by an ecosystem flawed by it&#8217;s own survivor bias.</p>\n\n<p>But the Internet aside I feel that the problem is even bigger, if you zoom out from the last years to the last decades. <strong>There is something fundamentally wrong with our society&#8217;s attitude towards science and innovation</strong>.</p>\n\n<h2>Reasons for Disenchantment: The illusion of progress</h2>\n\n<p>Our present day doesn&#8217;t feel futuristic and our future does not feel on its verge to come.</p>\n\n<p>Looking past at the cultural artifacts left by earlier generations it feels like that <strong>the 50s, 60s and even the 70s had a different approach to their future</strong>. They believed in technologic advancements and even more <strong>they believed that they could actively invent it themselves</strong>.</p>\n\n<blockquote>\n<p>&#8220;We have discarded a century of can-do ambition built on rapid advances in technology and replaced it with a cautiousness far too satisfied with incremental improvements.&#8221; ~Garry Kasparov in <a href="http://www.ft.com/intl/cms/s/0/8adeca00-2996-11e2-a5ca-00144feabdc0.html#axzz2GoClvy9Z">ft.com</a></p>\n</blockquote>\n\n\n<p><em>Highly recommend to watch: <a href="http://www.arte.tv/">ARTE</a> &#8220;Into the night&#8221; w/ Garry Kasparow &amp; Peter Thiel</em></p>\n\n<p>According to Garry Kasparow we slowed down. <strong>We lost ourselves in incremental improvements</strong> and wars of efficiencies, instead looking for disruptive developments and ambitious new projects.</p>\n\n<p>I personally do not agree with that view to the extreme Thiel and Kasparow put it. But i do believe that <strong>judging technologic advancement by the resulted IPO-size and not by social-impact leads to short-term thinking</strong> and repetitive patterns based on survivor bias.</p>\n\n<p>But the problem might be bigger than that…</p>\n\n<h3>Reasons for Disenchantment: The role of science</h3>\n\n<p>I believe our excitement for science is at an all-time low.</p>\n\n<p>Watch popular media of the last decades and you will see the public sentiment/portrait towards people pushing technological development. If development is celebrated it is in form of &#8220;quirky science stuff&#8221; or &#8220;high techie-techie&#8221;. It is ok for talk-show-moderators to shout into the camera that they have no idea about math or science.</p>\n\n<p>The public media presents characters – may they be fictionally or images of real people – which are either dorky scientists waiting for the ex-quarterback to solve everything with a witty common-knowledge-solution or the inventors are approximated to rock-stars or artists, the next best thing of a visionary persona our society wants to understand.</p>\n\n<p><img src="http://media.tumblr.com/51adc1810bd165d643b52fdfce9e5a06/tumblr_inline_mg1y91hp3a1r5v9i8.jpg" alt=""/></p>\n\n<p>Our society has no big craving to invent radical innovation. <strong>We need to unravel a new interest in science and innovation</strong> – a new love for visionary/crazy projects tackling 20-year projects.</p>\n\n<p>To make the future happen we need <strong>inspire ourselves as well as the next generations of creators</strong>. We need to <strong>communicate with the public</strong> and <strong>change this fundamentally wrong sentiment</strong>.</p>\n\n<p>Science needs to become cool.</p>\n\n<p>Until then,</p>\n\n<p>The sky is only the limit if you are too afraid to build rocket ships</p>\n\n<p>COPYPASTE POST\n~ <a href="http://www.twitter.com/andreasklinger">@andreasklinger</a></p>\n'
  }

  data = "" + data;

  for (tag in tags) {
    data = data.replace( new RegExp("{" + tag + "}", "ig"), tags[tag]);
  }

  data = data.replace ( /\{\/?block:[^\}]+\}/ig, '');


  return data;
}