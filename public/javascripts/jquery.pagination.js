(function($, document, undefined){
    $.fn.pagination = function(config) {
        var config = jQuery.extend({
            indicator : "",
            content : "div"
        }, config);
        var target = this;

        function activate(elem, f){
            elem.one('click',function(){
                f($(this), function(){ activate(elem, f); });
            });
        }

        var original = target.text();
        activate(target, function(elem, resume){
            target.addClass("loading").empty().html(config.indicator);
            $.get( config.url + "?id=" + config.current(), function(content){
                var dom = $(content);
                var messages = dom.find(config.content);
                elem.removeClass("loading");
                if(messages.length == 0){
                    elem.empty().html("no more message");
                } else {
                    target.trigger('pagination::load', [ messages ]);

                    messages.hide();
                    config.append(messages);
                    messages.fadeIn();

                    config.append(dom.slice(1));

                    elem.empty().html(original);

                    resume();
                }
            });
        });

        return this;
    };
})(jQuery, document);
