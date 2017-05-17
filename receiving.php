<html>
<head>
    <style>
        body {
            background: #364359;
            text-align: center;
            padding-top: 30%;
        }

        p {
            font-size: 30px;
        }

        p, a {
            color: #F2EFE9;
            font-family: "Arial", Sans-Serif;
            vertical-align: middle;
            text-decoration: none;
        }

        a {
            font-size: 24px;
	        opacity: 1;
            -webkit-transition: opacity 0.2s ease-in; /*safari and chrome */
            -moz-transition: opacity 0.2s ease-in; /* firefox */
            -o-transition: opacity 0.2s ease-in; /* opera */
            transiton: opacity 0.2s ease-in;
        }

        a:hover {
            opacity: 0.7;
        }

    </style>
</head>
<body>
    <?php

    error_reporting(-1);

    if(isset($_POST['submit'])) {
        $name = $_POST['name'];
        $submit_links = $_POST['submit_links'];
        $from_add = "submit@webdesignrepo.com";
        $to_add = "ben@webdesignrepo.com";
        $subject = "New Submission arrived!";
        $message = 'Name: ' . $name . "\n" . ' Sites: ' . $submit_links;

        $headers = 'From: ' . $from_add . "\r\n" .

        'Reply-To: ' . $to_add . "\r\n";

        mail($to_add, $subject, $message, $headers);

        echo '<p>Thanks ' . $name . '!</p>';
    } else {
        echo "Sorry, you cannot do that from here. Please fill in the form first.";
    }

    ?>
    <a href="http://www.webdesignrepo.com">webdesignrepo</a>
</body>
</html>