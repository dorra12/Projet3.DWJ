<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="utf-8" />
    <title>Site de réservation de Vélos en ligne au Luxembourg</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="VeloCityLuxembourg, application de location en ligne de vélo au Luxembourg" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="stylesheet_location_velo.css">
    <!--lien API MAP-->
    <script src='https://api.mapbox.com/mapbox-gl-js/v1.2.0/mapbox-gl.js'></script>
    <link href='https://api.mapbox.com/mapbox-gl-js/v1.2.0/mapbox-gl.css' rel='stylesheet' />
    <!--<script src='https://api.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v1.0.0/leaflet.markercluster.js'></script>-->
    <!--<link href='https://api.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v1.0.0/MarkerCluster.css' rel='stylesheet' />-->
    <!--<link href='https://api.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v1.0.0/MarkerCluster.Default.css' rel='stylesheet' />-->
    <!--lien API MAP-->

    <!-- favicon -->
    <script src="https://kit.fontawesome.com/7675129fd2.js"></script>


    <!-- Google Fonts -->

    <!-- Description-->
    <meta name="description" content="VeloCityLuxembourg, application de location en ligne de vélo au Luxembourg" />
    <meta name="keywords" content="application, velo, vélo, Luxembourg" />
    <meta name="author" content="Dorra" />
</head>

<body>
    <div class="menu-wrap">
        <input type="checkbox" class="toggler">
        <div class="hamburger">
            <div></div>
        </div>
        <!-- Barre de navigation -->
        <nav class="menu">
            <div>
                <div>
                    <ul class="expandable">
                        <li><a href="#">Accueil</a></li>
                        <li><a href="#diaporama">Carte</a></li>
                        <li><a href="#footer">Contact</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
    <div class="showcase">
        <header class="container text-center">
            <h2>Bienvenue sur notre site.</h2>
            <p>Disponible 24h/24 et 7j/7 vel'OH! vous accompagne à chaque instant et vous permet de visiter Luxembourg à Vélo</p>
            <p>Ici, le site vous permet de connaitre des vélos disponibles dans les stations et choisir le vélo de votre choix
            </p>
            <button type="button" class="btn btn-outline-success btn-sm mb-2">
                <a href="#" class="btn">Plus de details</a>
            </button>
        </header>
        <section id="diaporama">

            <div id="diaporama-slider">
                <div class="slideshow-container">
                    <div class="mySlides">
                        <div class="image">
                            <img id="diapo" src="Images/image1.png" alt="image_1">
                        </div>
                        <div class="text container">
                            <div class="row">
                                <h3 class="col-sm-12"> Bienvenue sur Vél'oh</h3>
                                <p class="col-sm-12"> Réservez votre vélo maintenant en suivant ces quelques étapes. </p>
                            </div>
                        </div>
                    </div>
                    <!--  premier Slide -->
                    <!-- Deuxième Slide -->
                    <div class="mySlides ">
                        <div class="image">

                            <img src="Images/image2.png" alt="image_2">
                        </div>
                        <div class="text container">
                            <div class="row">
                                <h3 class="col-sm-12"> Choisir sa Station</h3>
                                <p class="col-sm-12">C'est simple, allez sur la carte et sélectionner la station de votre choix.</p>
                            </div>
                        </div>
                    </div>
                    <!-- troisieme Slide -->
                    <div class="mySlides ">
                        <div class="image">
                            <img src="Images/image3.png" alt="image_3">
                        </div>
                        <div class="text container">
                            <div class="row">
                                <h3 class="col-sm-12"> Réservez !</h3>
                                <p class="col-sm-12">Il ne vous reste plus qu'à cliquer sur le bouton Réserver</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id=boutonPlayPause>
                    <i class="fas fa-arrow-circle-left" id="precedent"></i>
                    <i class="fas fa-pause-circle" id="bouton_pause"></i>
                    <i class="fas fa-play-circle" id="bouton_play"></i>
                    <i class="fas fa-arrow-circle-right" id="suivant"></i>
                </div>
            </div>
        </section>
        <!--Balise MAPBox-->

        <div class="initText">
            <p> <i class="fas fa-angle-double-down"></i> Cliquez sur la station de votre choix</p>
        </div>
        <div class="mapLuxembourg">

            <div id="mapZone">
                <div id='map'></div>
            </div>
        </div>
        <div id="station_non_reservable">
            <p> Vous ne pouvez pas reserver car il n'y a pas de vélo disponible! </p>
        </div>
        <section id="formulaire">
            <div class="container-fluid">
                <div class="row justify-content-between">

                    <div class="col col12 col-md-3">
                        <div class="infos_station">
                            <h2> Détails de la station </h2>
                            <p class="adresse">Adresse : </p>
                            <p class="status">Status :</p><span class="statusValue"></span>
                            <p class="velo_dispo"> Vélos Disponibles</p>
                            <p class="place_dispo">Places disponibles: </p>
                            <p id="buttonform" class="boutonS"><input type="submit" value="Reserver" /></p>
                        </div>
                    </div>
                    <div class="col col-12 col-md-8">
                        <form id="form_reserver">
                            <div class="infos_utilisateur container">
                                <dic class="row justify-content-between">
                                    <div class="infos_ut col col-12 col-md-6">
                                        <h2>Reservation</h2>
                                        <p><label for="prenom">Votre Prenom</label>
                                            <input type="text" name="prenom" placeholder="Prenom" id="filed1" maxlength="20" required/></p>
                                        <p><label for="nom">Votre Nom</label>
                                            <input type="text" name="nom" placeholder="Nom" id="filed2" maxlength="20" required/></p>
                                    </div>
                                    <div class="buttonformulaire col col-12 col-md-6">
                                        <h2>Signature</h2>
                                        <canvas id="myCanvas" width="200" height="100 "></canvas>
                                        <p class="boutonS"><input id="valider" type="submit" value="Valider" /></p>
                                        <p class="boutonS effacer"><input id="effacer" type="submit" value="Effacer" /></p>
                                    </div>
                                </dic>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div id="timer">
                <p id="reservation_text"></p>
                <p id="timertext"></p>
            </div>
        </section>



        <footer id="footer">
            <div id="contact">
                <h3 class="contact">Nous contacter</h3>
                <p>Du lundi au samedi de 8h à 18h</p>
                <p>Le dimanche et les jours fériés de 10h à 18h</p>
                <p>01 20 30 40 50</p>
            </div>
        </footer>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js " integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo " crossorigin="anonymous "></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js " integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1 " crossorigin="anonymous "></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js " integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM " crossorigin="anonymous "></script>
        <script src="Diaporama.js "></script>
        <script src="StationVelo.js "></script>
        <script src="marqueur.js "></script>
        <script src="mapLuxembourg.js "></script>
        <script src="JCDecauxConnector.js "></script>
        <script src="Timer.js "></script>
        <script src="InitReservation.js "></script>
        <script src="main.js "></script>
    </div>
</body>

</html>
