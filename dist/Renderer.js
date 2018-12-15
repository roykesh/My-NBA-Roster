class Renderer {

    renderRoster(data) {
        console.log({ data })
        $('.roster').empty()
        let source = $('#roster-template').html();
        let template = Handlebars.compile(source);
        let newHTML = template({ data });
        $('.roster-container').append(newHTML);
    }
}
