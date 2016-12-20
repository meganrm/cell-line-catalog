(function(module) {


  var cellLineProfileView = {};

  cellLineProfileView.disableLinks = function(){
    $('.subpage-nav').on('click', '.disabled', function(e){
      e.preventDefault();
      console.log('disabled');
      return false;
    });
  };

  cellLineProfileView.checkforData = function(cellLine){
    if (cellLine.Main_media.length > 0) {
      cellLineProfileView.makeGallery(cellLine);
      $('.morphology-images').show();
      $('#images-not-available').hide();
    }
    else {
      $('.morphology-images').hide();
      $('#images-not-available').show();
    }

    cellLine.subpaged_status.forEach(function(a){
      if (a.done==='true') {
        $('#tab_' + a.id).removeClass('disabled');
        if (a.id === 'editingdesign') {
          $('#tab_' + a.id).addClass('active');
          $('#' + a.id).addClass('active');

        }
      }
      else {
        $('#tab_' + a.id).addClass('disabled');
        $('#tab_' + a.id).removeClass('active');
        $('#' + a.id).removeClass('active');

      }
    });
  };

  cellLineProfileView.gallery = function() {
    $('#gallery-thumbnails').on('click', '.morphology-thumbnail', function(e) {
      e.preventDefault();
      $('.morphology-main').empty();
      $('.morphology-main').append($(this).find('.toappend').clone().attr('controls', '').attr('autoplay',''));
      $('.morphology-main').append($(this).find('.caption-container').clone());
      $(this).parents().find('.active').removeClass('active');
      $(this).addClass('active');
    });
  };

  cellLineProfileView.makeGallery = function(cellLine){
    $('.morphology-main').empty();
    $('#gallery-thumbnails').empty();

    if (cellLine.Main_media[0].type === 'movie') {
      console.log('movie', cellLine.Main_media[0]);
      $('.morphology-main').append(cellLine.nestedToHtml($('#gallery-main-movie-template'), cellLine.Main_media[0]));
    }
    else if (cellLine.Main_media[0].type ==='image') {
      console.log('image', cellLine.Main_media[0]);
      $('.morphology-main').append(cellLine.nestedToHtml($('#gallery-main-image-template'), cellLine.Main_media[0]));

    }
    cellLine.Main_media.forEach(function(a){
      if (a.type === 'movie') {
        console.log('movie', a);
        $('#gallery-thumbnails').append(cellLine.nestedToHtml($('#movie-thumbnail-template'), a));
      }
      else if (a.type ==='image') {
        console.log('image', a);
        $('#gallery-thumbnails').append(cellLine.nestedToHtml($('#image-thumbnail-template'), a));

      }
    });
  };



  cellLineProfileView.RenderProfile = function(cellLine) {
    $('#cellline-info').children().remove();
    $('.subpage-tab').children().remove();
    if ($('#cellline-info').find('ul').length ===0){
      $('#cellline-info').append(cellLine.toHtml($('#cell-profile-info-template')));

      $('#editingdesign').append(cellLine.toHtml($('#editingDesign-template')));
      $('#genomiccharacterizations').append(cellLine.toHtml($('#genomiccharacterizations-template')));
      if (typeof(cellLine['GenomicCharacterization_ddpcr']) !=='string') {
        cellLine['GenomicCharacterization_ddpcr'].forEach(function(a){
          $('#ddPCR-table').append(cellLine.nestedToHtml($('#ddPCR-template'), a ));
        });
      }
      if (typeof(cellLine['GenomicCharacterization_offtargets']) !=='string') {
        cellLine['GenomicCharacterization_offtargets'].forEach(function(a){
          $('#off-target-table').append(cellLine.nestedToHtml($('#offTargets-template'), a ));
        });
      }
      $('#validation').append(cellLine.toHtml($('#validation-template')));
      $('#stemcellcharacteristics').append(cellLine.toHtml($('#stemcellcharacteristics-template')));
      if (typeof(cellLine['StemCellCharacterization_pluripotency_analysis'])!=='string') {
        cellLine['StemCellCharacterization_pluripotency_analysis'].forEach(function(a){
          $('#pluripotent-table-body').append(cellLine.nestedToHtml($('#pluripotent-template'), a ));
        });
      }
      $('#supplementaryinformation').append(cellLine.toHtml($('#supplementaryinformation-template')));
      // cellLineProfileView.goBack();
      cellLineProfileView.gallery();
      $('#cell-collection-banner').show();
      cellLineProfileView.checkforData(cellLine);
      cellLineProfileView.disableLinks();
      $('#cellline-profile').show();

    }
  };

  // CellLine.fetchAll('../data/cell-lines.json', 'cell-lines', cellLineProfileView.renderIndexPage);

  module.cellLineProfileView = cellLineProfileView;
})(window);
