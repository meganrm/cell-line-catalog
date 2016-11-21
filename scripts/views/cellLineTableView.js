(function(module) {


  var cellListView = {};
  cellListView.filters = ['Main_gene_name', 'Main_structure', 'Main_fluorescent_tag', 'Main_parent_line'];

  $('#cell-line-table').on('click', '.cellline',function() {
    currentID=(this.id);
    $('#cell-line-list').hide();
    $('#cellline-profile').fadeIn();
    page('/cellline/' + currentID);
  });


  cellListView.setFilters = function(ctx){
    console.log(ctx.params.filtername, ctx.params.filtervalue);
    $('#'+ ctx.params.filtername + '-filter').val(ctx.params.filtervalue);
    $('#'+ ctx.params.filternamesec + '-filter').val(ctx.params.filtervaluesec);
  };

  cellListView.readFilters = function(){
    $('.cellline').hide();
    var filters = $('.filter').map(function() {
      return {
        value : $(this).val(),
        filter: this.id.replace('-filter', '')
      };}).get().filter(function(ele){
        return ele.value !== '';
      });
      if (filters.length> 0) {
        url = filters.reduce(function(acc, cur){
          acc.push('/' + cur.filter + '/' +cur.value);
          return acc;
        },[]);
        page(url.join(''));
      }
      else{
        page('/cell-line-catalog')
      }

  };

  cellListView.checkContext = function(ctx){
    if(ctx.celllines.length !== 0) {
      $('#cell-line-list .errors').hide();
    } else {
      $('#cell-line-list .errors').show();
      $('.filter').val('');
    }
  };

  $('.filter').on('change', cellListView.readFilters);

  cellListView.createFilter= function(filterid, option){
    var $parentOptions = $(filterid);
    $('<option>').val(option).addClass('options').attr('data-content', "<span class='label label-success'>Relish</span>").text(option).appendTo($parentOptions);
  };

  cellListView.drawTable = function(celllines) {
    celllines.forEach(function(a) {
      if (a.status === 'complete') {
        $('#cell-line-table').append(a.toHtml($('#cellList-template')));
      }
      else {
        $('#in_progress #cell-line-table').append(a.toHtml($('#cellList-template')));
      }
    });
  };

  cellListView.renderIndexPage = function(ctx) {
    $('#cellline-profile').hide();
    $('#cell-line-table').children().remove();
    $('#cell-line-list').show();
    $('#main').hide();
    $('.logo').attr('background-image', 'url(/images/logo-CLC.png)');
    if ($('select').find('.options').length ===0) {
      cellListView.filters.forEach(function(filter){
        CellLine.allInCategory(filter).forEach(function(option){
          cellListView.createFilter(('#'+filter+'-filter'), option);
        });
      });
    }
    cellListView.setFilters(ctx);
    cellListView.drawTable(ctx.celllines);
  };

  cellListView.renderMainPage = function(){
    $('#cellline-profile').hide();
    $('#cell-line-list').hide();
    $('#cell-line-table').children().remove();
    $('#main').show();
    $('.logo').attr('background-image', 'url(/images/logo-AC.png)');
  };

  cellListView.resetFilters =function(){
    $('.filter').val('');
  };

  module.cellListView = cellListView;
})(window);
