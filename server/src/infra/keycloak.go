package infra

type localKeyCloak struct{}

func NewLocalKeyCloak() *localKeyCloak {
	return &localKeyCloak{}
}
