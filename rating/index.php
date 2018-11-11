<?php
/**
 * Created by PhpStorm.
 * User: BravOFF
 * Date: 22/10/2018
 * Time: 22:51
 */
require_once $_SERVER['DOCUMENT_ROOT'].'/dashboard'.'/template/header.php';
require $_SERVER['DOCUMENT_ROOT'].'/dashboard'.'/vendor/autoload.php';


//use PhpOffice\PhpSpreadsheet;
$reader = new \PhpOffice\PhpSpreadsheet\Reader\Xlsx();
$reader->setReadDataOnly(false);
$spreadsheet = $reader->load("rating.xlsx");
//$cells = $spreadsheet->getActiveSheet()->getCellCollection();
$cells = $spreadsheet->getActiveSheet();
//pr($cells);

//pr($cells->getStyle('A1')->getFill()->getStartColor()->getRGB());
//pr($cells->getStyle('A10')->getFill()->getSharedComponent()->getEndColor()->getRGB());
?>

    <div class="container" style="padding-top: 14px; margin-top: 15px;">
    <!-- Content here -->
    <div class="row">
<?



echo '<table class="table table-hover table-striped table-bordered ">' . PHP_EOL;
foreach ($cells->getRowIterator() as $kr => $row) {
    echo '<tr>' . PHP_EOL;
    $cellIterator = $row->getCellIterator();
    $cellIterator->setIterateOnlyExistingCells(FALSE);//This loops through all cells,
    //   even if a cell value is not set.
    //By default, only cells that have a value
    //   set will be iterated.
    foreach ($cellIterator as $k => $cell) {


        if ($cell->getValue()) {

            switch ($cell->getDataType()){
                case 's':
                    $res = $cell->getValue();
                    break;
                case 'n':
                    $res = replaceNumber($cell->getValue());
                    if (in_array($k, ['B', 'F'])){
                        $res = replaceNumber($cell->getValue(), false);
                    }
                    break;
                case 'f':
                    $res = replaceNumber($spreadsheet->getActiveSheet()->getCell($k . $kr)->getCalculatedValue());
                    break;
                default:
                    $res = $cell->getValue();
                    break;
            }

            switch ($cell->getStyle()->getFill()->getFillType()){
                case 'solid':
                    $bgColor = $cell->getStyle()->getFill()->getStartColor()->getRGB();
                    break;
                case 'none':
                    $bgColor = 'ffffff';
                    break;
                default:
                    $bgColor = 'ffffff';
                    break;
            }



            echo '<td style="background-color: #'.$bgColor.'52; text-align:center;">';
//            echo '<td>';

//            var_dump($cell->getStyle()->getFill()->getStartColor()->getARGB());
//            pr($cells->getStyle('A1')->getFill()->getStartColor()->getRGB());
//            pr($cells->getStyle('A1')->getFill()->getEndColor()->getRGB());
//            pr($cell->getStyle()->getFill()->getFillType());
//            pr($cell->getStyle()->getFill()->getStartColor()->getRGB());
//            pr($cell->getStyle()->getFill()->getEndColor()->getRGB());
//            pr($cell->getDataType());

            echo    $res;

            echo    '</td>' . PHP_EOL;

        }

    }
    echo '</tr>' . PHP_EOL;
}
echo '</table>' . PHP_EOL;


?>

    </div>
    </div>
<?
require_once $_SERVER['DOCUMENT_ROOT'].'/dashboard'.'/template/footer.php';
?>