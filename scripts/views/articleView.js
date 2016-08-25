(function(module) {


  var cellListView = {};

  cellListView.handleRowSelect = function() {
    $('#cell-line-table').on('click', '.cellline',function() {
      console.log($(this));
      $('.cell-line-list').hide();
      $('.subpage[data-subpageid="' + $(this).val() + '"]').fadeIn();
      // cellLineSubPageView.renderView();
  })
};


  cellListView.handleFluorophoreFilter = function() {
    $('#fluorophore-filter').on('change', function() {
      console.log($(this).val());
      if ($(this).val()) {
        $('.cellline').hide();
        $('.cellline[data-fluorophore="' + $(this).val() + '"]').fadeIn();
      } else {
        $('.cellline').fadeIn();
      }
      $('#tagLocation-filter').val('');
    });
  };


  cellListView.handleTagFilter = function() {
    $('#tagLocation-filter').on('change', function() {
      if ($(this).val()) {
        $('.cellline').hide();
        $('.cellline[data-tagLocation="' + $(this).val() + '"]').fadeIn();
      } else {
        $('.cellline').fadeIn();
      }
      $('#fluorophore-filter').val('');
    });
  };

  cellListView.handleMainNav = function() {
    $('.main-nav').on('click', '.tab', function(e) {
      $('.tab-content').hide();
      $('#' + $(this).data('content')).fadeIn();
    });
    $('.main-nav .tab:first').click();
  };

  cellListView.createFilter= function(filterid, option ){
    var $parentOptions = $(filterid);
    console.log(option);
    $('<option>').val(option).text(option).appendTo($parentOptions);
  };

  cellListView.renderIndexPage = function() {
    CellLine.allTagLocations().forEach(function(a){
      cellListView.createFilter(('#tagLocation-filter'), a)

    })
    CellLine.allFluorophores().forEach(function(a){
      cellListView.createFilter(('#fluorophore-filter'), a)

    })
    CellLine.allCellLines.forEach(function(a) {
      $('#cell-line-table').append(a.toHtml($('#cellList-template')));
    });

    cellListView.handleFluorophoreFilter();
    cellListView.handleTagFilter();
    cellListView.handleMainNav();
    cellListView.handleRowSelect();

  };

CellLine.fetchAll('../data/cell-lines.json', 'cell-lines', cellListView.renderIndexPage);

  module.cellListView = cellListView;
})(window);
