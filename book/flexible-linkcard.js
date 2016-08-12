require(['gitbook', 'jQuery'], function (gitbook, $) {
  gitbook.events.bind('page.change', function () {
    var options = gitbook.state.config.pluginsConfig['flexible-linkcard'];

    $('blockquote').each(function () {
      var origin = $(this).html();
      var content = origin.replace(/@\[([\s\S]*)\]\{<code>(\S*)<\/code>[ "]*(\w*)"?\}\n?([\s\S]*)(?=<\/p>)/g, function (match, title, url, target, img) {
        if (!match) {
          return origin;
        }

        var reg = /^<code>(\S*)<\/code>[ "]*(\w*)"?/;
        var IMG;
        if (img) {
          IMG = img.match(reg);
          if (!IMG) {
            return origin;
          }
        }

        var hrefUrl = url ? url : options["hrefUrl"];
        var imgSrc = (IMG && IMG[1]) ? IMG[1] : options["imgSrc"];
        var imgClass = (IMG && IMG[2]) ? IMG[2]  : options["imgClass"];

        return (
          '<div class="linkcard">' +
            '<div class="linkcard-backdrop" style="background-image:url(' + imgSrc + ')"></div>' +
            '<a class="linkcard-content" target="' + (target ? target : options["target"]) + '" href="' + hrefUrl + '">' +
              '<div class="linkcard-text">' +
                '<p class="linkcard-title">' + (title ? title : options["title"]) + '</p>' +
                '<p class="linkcard-url"><i class="fa fa-link fa-rotate-90"></i>' + hrefUrl + '</p>' +
              '</div>' +
              '<div class="linkcard-imagecell ' + imgClass + '">' +
                  '<img class="linkcard-image" src="' + imgSrc + '">' +
              '</div>' +
            '</a>' +
          '</div>'
        );
      });

      // Do not change blockquotes without linkcard indicator.
      if (content !== origin) {
        $(this).replaceWith(content);
      }
    });
  });
});