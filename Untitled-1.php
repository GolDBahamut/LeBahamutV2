<?php

$moyenneEtudiant = 0;

if($moyenneEtudiant=0)
{
    echo ("Avec une note de ".$moyenneEtudiant." l'etudiant a rate");
}
elseif($moyenneEtudiant=10)
{
    echo ("Avec une note de ".$moyenneEtudiant." l'etudiant a passe de justesse");
}
elseif($moyenneEtudiant=20)
{
    echo ("Avec une note de ".$moyenneEtudiant." l'etudiant a a reussi avec brio");
}
?>

<?php

$moyenneEtudiant = 0;

switch ($moyenneEtudiant) {
    case '0':
        echo ("Avec une note de ".$moyenneEtudiant." l'etudiant a rate");
        break;
    case '0':
        echo ("Avec une note de ".$moyenneEtudiant." l'etudiant a passe de justesse");
        break;
    case '0':
        echo ("Avec une note de ".$moyenneEtudiant." l'etudiant a a reussi avec brio");
        break;
    
    default:
        echo ("$moyenneEtudiant is undefined");
        break;
}


?>