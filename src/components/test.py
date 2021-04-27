import win32com.client
import os.path


Outlook = win32com.client.Dispatch("Outlook.Application")
olNs = Outlook.GetNamespace("MAPI")
Inbox = olNs.GetDefaultFolder(6)

Filtermail = "[SenderEmailAddress] = 'xxx@yyy.com'"

Items = Inbox.Items.Restrict(Filtermail)
Item = Items.GetFirst()


for attachment in Items.Attachments:
    print(attachment.FileName)
    #attachment.SaveAsFile(os.getcwd() + '\\Mail\\' + 'zzzz.xlsx')
