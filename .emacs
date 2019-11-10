(set-default 'truncate-lines t)
(add-hook 'html-mode-hook
	  (lambda ()
	    ;; Default indentation is usually 2 spaces, changing to 4.
	    (set (make-local-variable 'sgml-basic-offset) 4)))

;; Enable flycheck
(global-flycheck-mode)

;; Maximize screen on startup
(add-to-list 'default-frame-alist '(fullscreen . maximized))
