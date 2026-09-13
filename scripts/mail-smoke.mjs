// Message compilation only: no SMTP connection, secrets or external message delivery.
import nodemailer from 'nodemailer';
import assert from 'node:assert/strict';
const transport=nodemailer.createTransport({streamTransport:true,buffer:true,newline:'unix',disableFileAccess:true,disableUrlAccess:true});
const result=await transport.sendMail({from:'KritRNA Website <test@example.invalid>',to:'contact@example.invalid',replyTo:'sender@example.invalid',subject:'Local mail compatibility check',text:'No external delivery. Test-only content.',attachments:[{filename:'sample.pdf',content:Buffer.from('Test-only attachment'),contentType:'application/pdf'}]});
assert(Buffer.isBuffer(result.message));const message=result.message.toString('utf8');
assert(message.includes('Subject: Local mail compatibility check'));
assert(message.includes('Reply-To: sender@example.invalid'));
assert(message.includes('application/pdf'));
console.log('MAIL_COMPILE_SMOKE_OK: subject, reply-to and in-memory attachment; no external delivery.');
transport.close();
