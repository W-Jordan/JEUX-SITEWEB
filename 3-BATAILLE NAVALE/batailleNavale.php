<?php

    define("NOMBRE_LIGNE",5);
    define("NOMBRE_COLONNE",5);
    define("LONGUEUR_BATEAU",3);
    define("NOMBRE_BATEAU_LIGNE",1);
    define("NOMBRE_BATEAU_COLONNE",1);

    //Initialiser le jeu
    $tabEnnemie = f_initialiserJeux();
    //Dessiner le bateau
    f_DessinerBateau($tabEnnemie,NOMBRE_BATEAU_LIGNE,NOMBRE_BATEAU_COLONNE);
    
    // * Afficher le jeux
    // f_afficherJeux($tabEnnemie);

    //lancer le jeux

    $boolFin=false;
    //initialiser batailleNavale vide
        $tabBataille = f_initialiserJeux();
    do{
        
        $intLigne =f_saisir("ligne") ;
        $intColonne =f_saisir("colonne") ;
        
        //Test si touché
        $tabBataille = f_testTouche($tabBataille,$tabEnnemie,$intLigne,$intColonne);

        //Affiche le Jeu
        f_afficherJeux($tabBataille);
        //test si plus aucun b dans tableau
    }while(!f_testToucheCoule($tabBataille,$tabEnnemie));

    echo "Touché, coulé !";

    function f_testToucheCoule(array $tab,array $tab2){
        //verifie que les b dans ennemie soit des x dans montab
        $bool=true;
        for ($i=0; $i <NOMBRE_LIGNE ; $i++) { 
            for ($j=0; $j <NOMBRE_COLONNE ; $j++) { 
                if($tab2[$i][$j]=="b" && $tab[$i][$j]!="x"){
                    $bool=false;
                    break;
                }    
            }
        }
        return $bool;    
    }

    function f_testTouche(array &$tab, array $tab2, int $l,int $c){
        //test si touché dans tab ennemie
        if($tab2[$l][$c]=="_"){
            $tab[$l][$c] = "o";
        }else{
            $tab[$l][$c]="x";
        }    
        return $tab;  
    }

    function f_saisir(string $strSaisie){
        if($strSaisie=="ligne"){
            do{
                $intSaisie=readline("Saisir un n° de ".$strSaisie." : ");
            }while($intSaisie < 0 && $intSaisie>(NOMBRE_LIGNE-1));       
        }else{
            do{
                $intSaisie=readline("Saisir un n° de ".$strSaisie." : ");
            }while($intSaisie < 0 && $intSaisie>(NOMBRE_COLONNE-1));
        }
        return $intSaisie;
    }

    function f_initialiserJeux(){
        $tab=[];
        for ($i=0; $i < NOMBRE_LIGNE ; $i++) { 
            for ($j=0; $j < NOMBRE_COLONNE ; $j++) { 
                $tab[$i][$j] = "_";
            }
        }
        return $tab;   
    }

    function f_afficherJeux(array $tab){
        echo "\nBataille navale : "."\n";
        echo "_ ";
        for ($i=0; $i < NOMBRE_COLONNE ; $i++) { 
            echo $i." ";
        }
        echo "\n";
        $i=0;
        foreach ($tab as $l){
            echo $i." ";
            $i++;
            foreach($l as $valeur){
                echo $valeur . " ";
            }
            echo "\n";
        }
    }

    function f_DessinerBateau(array &$tab,int $nbBateauLigne,int $nbBateauColonne){
        
        //Dessiner Bateau ligne
        for ($i=0; $i <$nbBateauLigne ; $i++) { 
            // pour chaque bateau
            $intL = rand(0,NOMBRE_LIGNE-1);
            $intC = rand(0,NOMBRE_COLONNE-1-(LONGUEUR_BATEAU));
            // verifier toutes les cases sont accessibles (!="_")
            do{
                $boolAccessible = true;
                for ($j=0; $j <= (LONGUEUR_BATEAU-1); $j++){ 
                    if ($tab[$intL][$j+$intC]=="b"){
                        $boolAccessible=false;
                    };
                }
            }while(!$boolAccessible);
            for ($j=0; $j <= (LONGUEUR_BATEAU-1); $j++){ 
                $tab[$intL][$j+$intC]="b";
            }
        }

        //Dessiner bateau colonne
        //Dessiner Bateau ligne
        for ($i=0; $i <$nbBateauColonne; $i++) { 
            // pour chaque bateau
            $intL = rand(0,NOMBRE_LIGNE-1-(LONGUEUR_BATEAU));
            $intC = rand(0,NOMBRE_COLONNE-1);
            // verifier toutes les cases sont accessibles (!="_")
            do{
                $boolAccessible = true;
                for ($j=0; $j <= (LONGUEUR_BATEAU-1); $j++){ 
                    if ($tab[$intL+$j][$intC]=="b"){
                        $boolAccessible=false;
                    };
                }
            }while(!$boolAccessible);
            for ($j=0; $j <= (LONGUEUR_BATEAU-1); $j++){ 
                $tab[$intL+$j][$intC]="b";
            }
        }

    }