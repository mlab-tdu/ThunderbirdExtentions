var newMailListener = {
    msgAdded: function(aMsgHdr) {
        if( !aMsgHdr.isRead )
		if(aMsgHdr.mime2DecodedAuthor !== '情報メディア学科演習準備室 <assist@mlab.im.dendai.ac.jp>'
			&& aMsgHdr.mime2DecodedAuthor !== 'SEPM_Server@mlab.im.dendai.ac.jp') {
			sendNotify();
		}
    }
}

function sendNotify() {
	var data = 'payload={"text":"You got a mail!!!!!!!!!!!!!!!!!!","icon_emoji":":pompom0c0:","username":"ponta", "channel": "#email-notify"}';
	var xmlHttpRequest = new XMLHttpRequest();
	xmlHttpRequest.onreadystatechange = function()
	{
	    var READYSTATE_COMPLETED = 4;
	    var HTTP_STATUS_OK = 200;

	    if( this.readyState == READYSTATE_COMPLETED
	     && this.status !== HTTP_STATUS_OK )
	    {
	        alert( "Some error is there." );
	    }
	}
	xmlHttpRequest.open( 'POST', 'https://hooks.slack.com/services/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' );
	xmlHttpRequest.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
	xmlHttpRequest.send( data );
}

function init() {
    var notificationService =
    Components.classes["@mozilla.org/messenger/msgnotificationservice;1"]
    .getService(Components.interfaces.nsIMsgFolderNotificationService);
    notificationService.addListener(newMailListener, notificationService.msgAdded);
}

addEventListener("load", init, true);
